import { createClientFromRequest } from 'npm:@base44/sdk@0.7.1';
import { customAlphabet } from 'npm:nanoid@3.3.4';

const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

// Helper to protect against NaN values
const protectValue = (value) => {
  const num = Number(value);
  return isNaN(num) || !isFinite(num) ? 0 : num;
};

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  try {
    const user = await base44.auth.me();
    if (!user) {
      return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    }

    const { mode, amount, recipient } = await req.json();
    const numericAmount = protectValue(amount);

    if (numericAmount <= 0) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid amount' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const senderBalance = protectValue(user.p51_balance);
    if (senderBalance < numericAmount) {
      return new Response(JSON.stringify({ success: false, error: 'Insufficient balance' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (mode === 'family') {
      if (!recipient) {
        return new Response(JSON.stringify({ success: false, error: 'Recipient is required for family mode' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }

      const { data: recipientUsers, error: recipientError } = await base44.asServiceRole.from('User').select('*').eq('email', recipient).limit(1);
      if (recipientError || !recipientUsers || recipientUsers.length === 0) {
        return new Response(JSON.stringify({ success: false, error: 'Recipient not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
      }
      const recipientUser = recipientUsers[0];

      // Perform transaction using service role for atomicity
      const newSenderBalance = senderBalance - numericAmount;
      const newRecipientBalance = protectValue(recipientUser.p51_balance) + numericAmount;

      const [senderUpdate, recipientUpdate, transactionCreate] = await Promise.all([
        base44.asServiceRole.from('User').update({ p51_balance: newSenderBalance }).eq('id', user.id),
        base44.asServiceRole.from('User').update({ p51_balance: newRecipientBalance }).eq('id', recipientUser.id),
        base44.asServiceRole.from('Transaction').insert({
          from_user: user.email,
          to_user: recipientUser.email,
          p51_amount: numericAmount,
          transaction_type: 'sent',
          reason: 'Pass It On',
        }),
      ]);

      if (senderUpdate.error || recipientUpdate.error || transactionCreate.error) {
        console.error("Transaction failed:", senderUpdate.error, recipientUpdate.error, transactionCreate.error);
        return new Response(JSON.stringify({ success: false, error: 'Transaction failed during processing.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
      
      let emailSent = false;
      let emailError = null;
      try {
        await base44.asServiceRole.integrations.Core.SendEmail({
            to: recipient,
            subject: `❤️ You've Received Love from ${user.full_name}!`,
            body: `
                <div style="font-family: sans-serif; text-align: center; background-color: #111; color: #fff; padding: 40px;">
                    <h1 style="color: #a78bfa;">Love Has Arrived!</h1>
                    <p style="font-size: 1.2rem;">${user.full_name} has just sent you ${numericAmount} $P51.</p>
                    <p>This is a gift of pure love, with no strings attached. It is now in your Universal Wallet.</p>
                    <a href="https://uf51.love/portal" style="display: inline-block; background-color: #8b5cf6; color: #fff; padding: 15px 25px; margin: 20px 0; text-decoration: none; border-radius: 10px; font-weight: bold;">
                        View Your Wallet
                    </a>
                    <p style="font-size: 0.9rem; color: #777;">With love from the Universal Frequency 51</p>
                </div>
            `
        });
        emailSent = true;
      } catch (e) {
          emailError = e.message;
          console.error("Email sending failed:", e);
      }

      return new Response(JSON.stringify({ 
        success: true, 
        mode: 'family', 
        recipient: { name: recipientUser.full_name, email: recipientUser.email },
        emailSent: emailSent,
        emailError: emailError
      }), { status: 200, headers: { 'Content-Type': 'application/json' } });

    } else if (mode === 'freedom_code') {
      const code = nanoid();
      
      const { error: freedomCodeError } = await base44.asServiceRole.from('FreedomCode').insert({
        code: code,
        amount: numericAmount,
        created_by: user.id
      });

      if (freedomCodeError) {
          console.error("Freedom code creation failed:", freedomCodeError);
          return new Response(JSON.stringify({ success: false, error: 'Could not generate freedom code.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
      
       // Deduct from sender's balance immediately upon code creation
      const newSenderBalance = senderBalance - numericAmount;
      await base44.asServiceRole.from('User').update({ p51_balance: newSenderBalance }).eq('id', user.id);
      
      await base44.asServiceRole.from('Transaction').insert({
          from_user: user.email,
          to_user: 'freedom_code',
          p51_amount: numericAmount,
          transaction_type: 'sent',
          reason: `Freedom Code Generated: ${code}`,
          reference_id: code
      });

      return new Response(JSON.stringify({ success: true, mode: 'freedom_code', code: code }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: false, error: 'Invalid mode' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

  } catch (error) {
    console.error('Pass It On Error:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});