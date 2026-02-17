import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function TalkToAI51() {
  const navigate = useNavigate();
  useEffect(() => { navigate(createPageUrl('AI51'), { replace: true }); }, []);
  return null;
}