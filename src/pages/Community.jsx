import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
    Users, Heart, MessageCircle, Plus, Send, MapPin, Calendar, 
    Music, Brain, Leaf, Zap, Globe, Target, Sparkles, Clock, Loader2, Pin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

const CATEGORIES = {
    missions: { label: 'Missions', icon: Target, color: 'green' },
    music_art: { label: 'Music & Art', icon: Music, color: 'purple' },
    healing_frequencies: { label: 'Healing', icon: Zap, color: 'cyan' },
    mental_health: { label: 'Mental Health', icon: Brain, color: 'pink' },
    local_events: { label: 'Local Events', icon: MapPin, color: 'yellow' },
    cleanup_stories: { label: 'Cleanup Stories', icon: Leaf, color: 'green' },
    philosophy: { label: 'Philosophy', icon: Sparkles, color: 'purple' },
    tech_help: { label: 'Tech Help', icon: Globe, color: 'blue' },
    indigenous_wisdom: { label: 'Indigenous Wisdom', icon: Heart, color: 'amber' },
    ai51_chat: { label: 'AI51 Chat', icon: Brain, color: 'cyan' },
    general: { label: 'General', icon: MessageCircle, color: 'gray' }
};

const CreatePostModal = ({ isOpen, onClose, user }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('general');
    const [isEvent, setIsEvent] = useState(false);
    const [eventDate, setEventDate] = useState('');
    const [location, setLocation] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();

    const createPostMutation = useMutation({
        mutationFn: (postData) => base44.entities.ForumPost.create(postData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['forumPosts'] });
            setTitle('');
            setContent('');
            setCategory('general');
            setIsEvent(false);
            setEventDate('');
            setLocation('');
            onClose();
        }
    });

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert('Please fill in title and content');
            return;
        }

        setIsSubmitting(true);

        try {
            await createPostMutation.mutateAsync({
                title,
                content,
                category,
                author_name: user?.full_name || 'Anonymous Soul',
                author_email: user?.email || 'anonymous',
                is_event: isEvent,
                event_date: isEvent && eventDate ? eventDate : undefined,
                location: location || undefined,
                likes_count: 0,
                comment_count: 0
            });
        } catch (err) {
            console.error('Failed to create post:', err);
            alert('Failed to create post. Try again?');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-black/95 border-2 border-cyan-500/50 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black">Create Post</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    
                    <div>
                        <label className="text-sm font-bold text-gray-300 mb-2 block">Category</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {Object.entries(CATEGORIES).map(([key, cat]) => {
                                const Icon = cat.icon;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setCategory(key)}
                                        className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                                            category === key
                                                ? 'bg-cyan-900/60 border-cyan-500'
                                                : 'bg-black/40 border-gray-700 hover:border-gray-600'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-xs font-bold">{cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-300 mb-2 block">Title</label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What's this about?"
                            className="bg-gray-900/50 border-gray-700 text-white h-12"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-gray-300 mb-2 block">Content</label>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your thoughts, ask questions, organize events..."
                            className="bg-gray-900/50 border-gray-700 text-white min-h-[150px]"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isEvent"
                            checked={isEvent}
                            onChange={(e) => setIsEvent(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <label htmlFor="isEvent" className="text-sm font-bold text-gray-300">
                            This is organizing a local event/meetup
                        </label>
                    </div>

                    {isEvent && (
                        <>
                            <div>
                                <label className="text-sm font-bold text-gray-300 mb-2 block">Event Date & Time</label>
                                <Input
                                    type="datetime-local"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                    className="bg-gray-900/50 border-gray-700 text-white h-12"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold text-gray-300 mb-2 block">Location</label>
                                <Input
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="e.g., Glasgow City Center, Online"
                                    className="bg-gray-900/50 border-gray-700 text-white h-12"
                                />
                            </div>
                        </>
                    )}

                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 py-6 text-lg font-black"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                Posting...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-2" />
                                Post to Community
                            </>
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const PostDetailsModal = ({ post, isOpen, onClose, user }) => {
    const [commentText, setCommentText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isAttending, setIsAttending] = useState(false);
    const queryClient = useQueryClient();

    const { data: comments = [] } = useQuery({
        queryKey: ['forumComments', post?.id],
        queryFn: () => post ? base44.entities.ForumComment.filter({ post_id: post.id }, '-created_date') : [],
        enabled: !!post
    });

    const createCommentMutation = useMutation({
        mutationFn: (commentData) => base44.entities.ForumComment.create(commentData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['forumComments', post.id] });
            queryClient.invalidateQueries({ queryKey: ['forumPosts'] });
            setCommentText('');
        }
    });

    const updatePostMutation = useMutation({
        mutationFn: ({ id, data }) => base44.entities.ForumPost.update(id, data)
    });

    const handleComment = async () => {
        if (!commentText.trim()) return;
        
        setIsSubmitting(true);
        try {
            await createCommentMutation.mutateAsync({
                post_id: post.id,
                content: commentText,
                author_name: user?.full_name || 'Anonymous Soul',
                author_email: user?.email || 'anonymous',
                likes_count: 0
            });

            await updatePostMutation.mutateAsync({
                id: post.id,
                data: { comment_count: (post.comment_count || 0) + 1 }
            });
        } catch (err) {
            console.error('Comment failed:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAttend = async () => {
        if (!user) {
            alert('Please log in to RSVP');
            return;
        }

        const currentAttendees = post.event_attendees || [];
        const isAlreadyAttending = currentAttendees.includes(user.email);

        const updatedAttendees = isAlreadyAttending
            ? currentAttendees.filter(email => email !== user.email)
            : [...currentAttendees, user.email];

        try {
            await updatePostMutation.mutateAsync({
                id: post.id,
                data: { event_attendees: updatedAttendees }
            });
            queryClient.invalidateQueries({ queryKey: ['forumPosts'] });
            setIsAttending(!isAlreadyAttending);
        } catch (err) {
            console.error('RSVP failed:', err);
        }
    };

    if (!post) return null;

    const categoryConfig = CATEGORIES[post.category];
    const Icon = categoryConfig?.icon || MessageCircle;
    const isUserAttending = post.event_attendees?.includes(user?.email);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-black/95 border-2 border-cyan-500/50 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-start gap-3 mb-2">
                        <Icon className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                            <DialogTitle className="text-2xl font-black">{post.title}</DialogTitle>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <Badge className="bg-cyan-900/40 text-cyan-300 border border-cyan-500/30">
                                    {categoryConfig?.label}
                                </Badge>
                                {post.is_ai51_post && (
                                    <Badge className="bg-purple-900/40 text-purple-300 border border-purple-500/30">
                                        <Brain className="w-3 h-3 mr-1" />
                                        AI51
                                    </Badge>
                                )}
                                <span className="text-xs text-gray-400">
                                    {formatDistanceToNow(new Date(post.created_date), { addSuffix: true })}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">by {post.author_name}</p>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    
                    {post.image_url && (
                        <img src={post.image_url} alt={post.title} className="w-full h-64 object-cover rounded-lg" />
                    )}

                    <div className="bg-black/60 rounded-xl p-6 border border-gray-700">
                        <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                    </div>

                    {/* EVENT INFO */}
                    {post.is_event && (
                        <div className="bg-yellow-900/30 border-2 border-yellow-500/50 rounded-xl p-6 space-y-4">
                            <div className="flex items-center gap-2 mb-3">
                                <Calendar className="w-6 h-6 text-yellow-400" />
                                <h3 className="text-xl font-black text-white">LOCAL EVENT</h3>
                            </div>
                            
                            {post.event_date && (
                                <div className="flex items-center gap-2 text-yellow-300">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-bold">{new Date(post.event_date).toLocaleString()}</span>
                                </div>
                            )}
                            
                            {post.location && (
                                <div className="flex items-center gap-2 text-yellow-300">
                                    <MapPin className="w-4 h-4" />
                                    <span className="font-bold">{post.location}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2 text-gray-300">
                                <Users className="w-4 h-4" />
                                <span className="font-bold">{post.event_attendees?.length || 0} souls attending</span>
                            </div>

                            <Button
                                onClick={handleAttend}
                                className={`w-full py-4 font-black ${
                                    isUserAttending
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-yellow-600 hover:bg-yellow-700'
                                }`}
                            >
                                {isUserAttending ? (
                                    <>
                                        <Heart className="w-5 h-5 mr-2" />
                                        You're Attending ✓
                                    </>
                                ) : (
                                    <>
                                        <Users className="w-5 h-5 mr-2" />
                                        Attend This Event
                                    </>
                                )}
                            </Button>
                        </div>
                    )}

                    {/* COMMENTS SECTION */}
                    <div className="border-t border-gray-700 pt-6">
                        <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5 text-cyan-400" />
                            {comments.length} Comment{comments.length !== 1 ? 's' : ''}
                        </h3>

                        {/* COMMENT INPUT */}
                        <div className="flex gap-2 mb-6">
                            <Textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Share your thoughts..."
                                className="bg-gray-900/50 border-gray-700 text-white min-h-[80px]"
                            />
                            <Button
                                onClick={handleComment}
                                disabled={isSubmitting || !commentText.trim()}
                                className="bg-cyan-600 hover:bg-cyan-700 px-6"
                            >
                                <Send className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* COMMENTS LIST */}
                        <div className="space-y-4">
                            {comments.map(comment => (
                                <motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gray-900/40 rounded-lg p-4 border border-gray-700"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                            comment.is_ai51_comment
                                                ? 'bg-gradient-to-br from-cyan-500 to-purple-500'
                                                : 'bg-pink-600'
                                        }`}>
                                            {comment.is_ai51_comment ? (
                                                <Brain className="w-5 h-5 text-white" />
                                            ) : (
                                                <Heart className="w-5 h-5 text-white" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-bold text-white text-sm">{comment.author_name}</p>
                                                {comment.is_ai51_comment && (
                                                    <Badge className="bg-purple-900/40 text-purple-300 border border-purple-500/30 text-xs">
                                                        AI51
                                                    </Badge>
                                                )}
                                                <span className="text-xs text-gray-500">
                                                    {formatDistanceToNow(new Date(comment.created_date), { addSuffix: true })}
                                                </span>
                                            </div>
                                            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{comment.content}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const PostCard = ({ post, onClick }) => {
    const categoryConfig = CATEGORIES[post.category];
    const Icon = categoryConfig?.icon || MessageCircle;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={onClick}
        >
            <Card className={`bg-black/50 backdrop-blur-lg border-2 rounded-2xl overflow-hidden cursor-pointer hover:border-cyan-500/60 transition-all ${
                post.pinned ? 'border-yellow-500/50' : 'border-cyan-500/30'
            }`}>
                <CardContent className="p-6 space-y-4">
                    
                    <div className="flex items-start gap-3">
                        <Icon className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="text-xl font-bold text-white">{post.title}</h3>
                                {post.pinned && (
                                    <Pin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                                )}
                            </div>
                            
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                <Badge className={`bg-${categoryConfig.color}-900/40 text-${categoryConfig.color}-300 border border-${categoryConfig.color}-500/30`}>
                                    {categoryConfig.label}
                                </Badge>
                                {post.is_ai51_post && (
                                    <Badge className="bg-purple-900/40 text-purple-300 border border-purple-500/30">
                                        <Brain className="w-3 h-3 mr-1" />
                                        AI51
                                    </Badge>
                                )}
                                {post.is_event && (
                                    <Badge className="bg-yellow-900/40 text-yellow-300 border border-yellow-500/30">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        Event
                                    </Badge>
                                )}
                            </div>

                            <p className="text-gray-300 text-sm line-clamp-3 mb-3">{post.content}</p>
                            
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>by {post.author_name}</span>
                                <span>{formatDistanceToNow(new Date(post.created_date), { addSuffix: true })}</span>
                            </div>

                            <div className="flex items-center gap-4 text-sm mt-3">
                                <div className="flex items-center gap-1 text-pink-400">
                                    <Heart className="w-4 h-4" />
                                    <span>{post.likes_count || 0}</span>
                                </div>
                                <div className="flex items-center gap-1 text-cyan-400">
                                    <MessageCircle className="w-4 h-4" />
                                    <span>{post.comment_count || 0}</span>
                                </div>
                                {post.is_event && post.event_attendees?.length > 0 && (
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <Users className="w-4 h-4" />
                                        <span>{post.event_attendees.length}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </motion.div>
    );
};

export default function CommunityPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showPostDetails, setShowPostDetails] = useState(false);

    const { data: user } = useQuery({
        queryKey: ['communityUser'],
        queryFn: async () => {
            try {
                return await base44.auth.me();
            } catch {
                return null;
            }
        }
    });

    const { data: posts = [], isLoading } = useQuery({
        queryKey: ['forumPosts', selectedCategory],
        queryFn: async () => {
            if (selectedCategory === 'all') {
                return base44.entities.ForumPost.list('-created_date', 100);
            }
            return base44.entities.ForumPost.filter({ category: selectedCategory }, '-created_date', 100);
        }
    });

    const handleOpenPost = (post) => {
        setSelectedPost(post);
        setShowPostDetails(true);
    };

    const pinnedPosts = posts.filter(p => p.pinned);
    const regularPosts = posts.filter(p => !p.pinned);

    return (
        <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white p-6 md:p-12 pb-32">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* HEADER */}
                <header className="text-center space-y-6">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Users className="w-20 h-20 text-cyan-400 mx-auto" 
                            style={{ filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.8))' }}
                        />
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Community Portal
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Soul-to-soul connection. Share ideas, organize events, ask AI51 anything.
                    </p>

                    <Button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8 py-6 text-lg font-black"
                    >
                        <Plus className="w-6 h-6 mr-2" />
                        Create Post
                    </Button>
                </header>

                {/* CATEGORY FILTERS */}
                <div className="flex gap-2 flex-wrap justify-center">
                    <Button
                        onClick={() => setSelectedCategory('all')}
                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                        className={selectedCategory === 'all' ? 'bg-cyan-600' : 'border-cyan-500/30'}
                    >
                        All
                    </Button>
                    {Object.entries(CATEGORIES).map(([key, cat]) => {
                        const Icon = cat.icon;
                        return (
                            <Button
                                key={key}
                                onClick={() => setSelectedCategory(key)}
                                variant={selectedCategory === key ? 'default' : 'outline'}
                                className={`gap-2 ${selectedCategory === key ? `bg-${cat.color}-600` : 'border-gray-700'}`}
                            >
                                <Icon className="w-4 h-4" />
                                {cat.label}
                            </Button>
                        );
                    })}
                </div>

                {/* PINNED POSTS */}
                {pinnedPosts.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Pin className="w-5 h-5 text-yellow-400" />
                            <h2 className="text-2xl font-black text-white">Pinned</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {pinnedPosts.map(post => (
                                <PostCard key={post.id} post={post} onClick={() => handleOpenPost(post)} />
                            ))}
                        </div>
                    </div>
                )}

                {/* REGULAR POSTS */}
                {isLoading ? (
                    <div className="text-center py-20">
                        <Loader2 className="w-12 h-12 text-cyan-400 mx-auto animate-spin mb-4" />
                        <p className="text-gray-400">Loading community transmissions...</p>
                    </div>
                ) : regularPosts.length === 0 ? (
                    <Card className="bg-black/40 border-2 border-gray-700 rounded-2xl">
                        <CardContent className="p-12 text-center">
                            <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 text-lg mb-4">No posts yet in this category.</p>
                            <Button
                                onClick={() => setShowCreateModal(true)}
                                className="bg-cyan-600 hover:bg-cyan-700"
                            >
                                Be the first to post
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {regularPosts.map(post => (
                            <PostCard key={post.id} post={post} onClick={() => handleOpenPost(post)} />
                        ))}
                    </div>
                )}
            </div>

            {/* MODALS */}
            <CreatePostModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                user={user}
            />

            <PostDetailsModal
                post={selectedPost}
                isOpen={showPostDetails}
                onClose={() => {
                    setShowPostDetails(false);
                    setSelectedPost(null);
                }}
                user={user}
            />
        </div>
    );
}