import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { MessageCircle, Send, CheckCircle } from 'lucide-react';

export default function TeacherInput() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    request_type: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await base44.entities.ContactMessage.create({
        name: formData.name,
        email: formData.email,
        message: `[TEACHER REQUEST - ${formData.request_type}]\nSchool: ${formData.school}\n\n${formData.message}`,
        status: 'new'
      });

      setIsSubmitted(true);
      setFormData({ name: '', email: '', school: '', request_type: '', message: '' });
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center space-y-6"
        >
          <CheckCircle className="w-24 h-24 text-green-400 mx-auto" />
          <h2 className="text-4xl font-black text-white">Thank You!</h2>
          <p className="text-xl text-gray-300">
            We've received your request and will get back to you soon.
          </p>
          <Button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-cyan-600 to-purple-600"
          >
            Submit Another Request
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-black text-white p-6 md:p-12">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* HEADER */}
        <header className="text-center space-y-6">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }}>
            <MessageCircle className="w-24 h-24 text-cyan-300 mx-auto" style={{ filter: 'drop-shadow(0 0 20px #67e8f9)' }} />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-transparent">
            TEACHER INPUT
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Request new features, reading materials, or suggest improvements
          </p>
        </header>

        {/* FORM */}
        <Card className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500/50 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Submit Your Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* NAME */}
              <div>
                <label className="text-white font-bold mb-2 block">Your Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="bg-black/40 border-cyan-500/30 text-white"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-white font-bold mb-2 block">Your Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="bg-black/40 border-cyan-500/30 text-white"
                />
              </div>

              {/* SCHOOL */}
              <div>
                <label className="text-white font-bold mb-2 block">School Name</label>
                <Input
                  value={formData.school}
                  onChange={(e) => setFormData({...formData, school: e.target.value})}
                  required
                  className="bg-black/40 border-cyan-500/30 text-white"
                />
              </div>

              {/* REQUEST TYPE */}
              <div>
                <label className="text-white font-bold mb-2 block">Type of Request</label>
                <Select 
                  value={formData.request_type} 
                  onValueChange={(value) => setFormData({...formData, request_type: value})}
                  required
                >
                  <SelectTrigger className="bg-black/40 border-cyan-500/30 text-white">
                    <SelectValue placeholder="Choose request type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new_feature">New Feature Request</SelectItem>
                    <SelectItem value="reading_material">New Reading Material</SelectItem>
                    <SelectItem value="classroom_activity">Classroom Activity Idea</SelectItem>
                    <SelectItem value="accessibility">Accessibility Improvement</SelectItem>
                    <SelectItem value="bug_report">Bug Report</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* MESSAGE */}
              <div>
                <label className="text-white font-bold mb-2 block">Your Request / Suggestion</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  className="min-h-[150px] bg-black/40 border-cyan-500/30 text-white"
                  placeholder="Tell us what you'd like to see or improve..."
                />
              </div>

              {/* SUBMIT */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold text-lg py-6"
              >
                {isSubmitting ? (
                  'Submitting...'
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>

            </form>
          </CardContent>
        </Card>

        {/* INFO BOX */}
        <Card className="bg-black/60 border-2 border-purple-500/50 rounded-3xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-white mb-3">What You Can Request:</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• <strong className="text-white">New Features:</strong> Classroom tools, student tracking, reports</li>
              <li>• <strong className="text-white">Reading Materials:</strong> More content for kids to read and learn</li>
              <li>• <strong className="text-white">Activity Ideas:</strong> Lesson plans, worksheets, projects</li>
              <li>• <strong className="text-white">Accessibility:</strong> More support for different learning needs</li>
              <li>• <strong className="text-white">Bug Reports:</strong> Something not working? Let us know</li>
            </ul>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}