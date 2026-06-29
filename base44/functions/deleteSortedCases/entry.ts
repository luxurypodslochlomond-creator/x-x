import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    
    // Verify user is authenticated
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete all SortedCase records for this user
    // RLS ensures they can only delete their own
    await base44.entities.SortedCase.deleteMany({});

    return Response.json({ 
      success: true, 
      message: 'All server data deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting SortedCase records:', error);
    return Response.json({ 
      error: error.message 
    }, { status: 500 });
  }
});