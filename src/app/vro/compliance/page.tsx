'use client';

import React, { useState } from 'react';
import {
    Upload,
    CheckCircle,
    AlertCircle,
    FileText,
    Send,
    X,
    Image as ImageIcon,
    File,
    Loader2,
    CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const pendingTasks = [
    { id: 'Q1', text: 'सजा डायरी अद्ययावत आहे का?', dept: 'महसूल', mandatory: true },
    { id: 'Q2', text: 'गाव नमुना नंबर १ ते २१ दप्तरी नोंद आहे का?', dept: 'महसूल', mandatory: true },
    { id: 'Q3', text: 'सातबारा संगणकीकरण १००% पूर्ण झाले आहे का?', dept: 'नोंदणी', mandatory: false },
];

export default function VROCompliance() {
    const [selectedTask, setSelectedTask] = useState<string | null>(null);
    const [complianceText, setComplianceText] = useState('');
    const [taskFiles, setTaskFiles] = useState<Record<string, { name: string, type: string, url?: string, uploading: boolean }[]>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !selectedTask) return;

        const newFile = { name: file.name, type: file.type, uploading: true };
        setTaskFiles(prev => ({
            ...prev,
            [selectedTask]: [...(prev[selectedTask] || []), newFile]
        }));

        const formData = new FormData();
        formData.append('file', file);
        formData.append('sajaName', 'Compliance_Evidence');

        try {
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();

            if (data.success) {
                setTaskFiles(prev => ({
                    ...prev,
                    [selectedTask]: prev[selectedTask].map(f =>
                        f.name === file.name ? { ...f, uploading: false, url: data.link } : f
                    )
                }));
            }
        } catch (error) {
            alert('फाईल अपलोड करताना चूक झाली.');
        }
    };

    const removeFile = (taskId: string, fileName: string) => {
        setTaskFiles(prev => ({
            ...prev,
            [taskId]: prev[taskId].filter(f => f.name !== fileName)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            alert('आपली पूर्तता माहिती आणि दस्तऐवज यशस्वीरित्या जतन केले आहेत!');
            setComplianceText('');
            setSelectedTask(null);
        }, 2000);
    };

    const currentTask = pendingTasks.find(t => t.id === selectedTask);
    const currentFiles = selectedTask ? taskFiles[selectedTask] || [] : [];

    return (
        <div className="space-y-8 animate-fade-in pb-20">
            <header className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">पूर्तता आणि दस्तऐवज अपलोड</h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium italic">तपासणीत आढळलेल्या त्रुटींची पूर्तता येथे सादर करा.</p>
                </div>
                <div className="bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-100 flex items-center gap-2 text-emerald-700 font-black uppercase text-xs tracking-widest shadow-sm">
                    <CheckCircle2 size={20} />
                    VRO पोर्टल
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* List of pending tasks */}
                <div className="lg:col-span-4 space-y-4">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-6">
                        <AlertCircle className="text-amber-500" size={24} />
                        प्रलंबित कामे ({pendingTasks.length})
                    </h2>
                    <div className="space-y-4">
                        {pendingTasks.map((task) => {
                            const hasEvidence = (taskFiles[task.id]?.length || 0) > 0;
                            return (
                                <motion.div
                                    whileHover={{ x: 8 }}
                                    key={task.id}
                                    onClick={() => setSelectedTask(task.id)}
                                    className={cn(
                                        "premium-card !p-5 cursor-pointer border-2 transition-all relative",
                                        selectedTask === task.id ? "border-indigo-600 bg-white" : "border-white"
                                    )}
                                >
                                    {hasEvidence && (
                                        <div className="absolute top-0 right-0 bg-emerald-500 text-white p-1 rounded-bl-xl shadow-lg shadow-emerald-200">
                                            <CheckCircle size={14} />
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase text-slate-500 tracking-tighter">
                                            {task.dept}
                                        </span>
                                        {task.mandatory && (
                                            <span className="text-[10px] font-black text-rose-500 uppercase flex items-center gap-1 italic">
                                                * अनिवार्य
                                            </span>
                                        )}
                                    </div>
                                    <p className="font-bold text-slate-800 leading-snug">{task.text}</p>
                                    {hasEvidence && (
                                        <div className="mt-3 text-xs font-black text-emerald-600 uppercase flex items-center gap-1">
                                            <FileText size={12} /> {taskFiles[task.id].length} पुरावे जोडले
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Form area */}
                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {selectedTask ? (
                            <motion.form
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onSubmit={handleSubmit}
                                className="premium-card !p-12 space-y-10 min-h-[600px] flex flex-col"
                            >
                                <div className="space-y-2">
                                    <span className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">पायरी: पूर्तता अहवाल</span>
                                    <h3 className="text-2xl font-black text-slate-900 leading-tight border-b pb-6">
                                        {currentTask?.text}
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    <label className="block text-lg font-bold text-slate-800">स्पष्टीकरण / केलेले बदल</label>
                                    <textarea
                                        className="w-full h-44 p-6 rounded-3xl border border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 outline-none transition-all text-lg font-medium shadow-inner bg-slate-50/50"
                                        placeholder="येथे महिती लिहा... (उदा: सर्व दप्तर अद्ययावत करून कपाटात ठेवण्यात आले आहे.)"
                                        value={complianceText}
                                        onChange={(e) => setComplianceText(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-6">
                                    <label className="block text-lg font-bold text-slate-800 flex justify-between items-center">
                                        <span>फोटो किंवा अधिकृत दस्तऐवज (Max 3)</span>
                                        <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{currentFiles.length}/3</span>
                                    </label>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {currentFiles.map((f, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-indigo-100 shadow-sm">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                                                        {f.type.includes('image') ? <ImageIcon size={20} /> : <File size={20} />}
                                                    </div>
                                                    <span className="font-bold text-slate-700 truncate text-sm">{f.name}</span>
                                                </div>
                                                {f.uploading ? (
                                                    <Loader2 size={18} className="animate-spin text-indigo-500" />
                                                ) : (
                                                    <button type="button" onClick={() => removeFile(selectedTask, f.name)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                                                        <X size={18} />
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        {currentFiles.length < 3 && (
                                            <label className="border-2 border-dashed border-indigo-200 rounded-3xl p-6 flex flex-col items-center justify-center bg-indigo-50/10 hover:bg-indigo-50 transition-all cursor-pointer group h-full min-h-[140px]">
                                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                                    <Upload className="text-indigo-600" size={24} />
                                                </div>
                                                <span className="mt-3 text-indigo-700 font-black text-xs uppercase tracking-widest">फाईल जोडा</span>
                                                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,application/pdf" />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-10 mt-auto">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || (currentTask?.mandatory && currentFiles.length === 0)}
                                        className="w-full py-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-3xl font-black text-xl hover:shadow-2xl hover:shadow-indigo-300 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                                    >
                                        {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={24} />}
                                        {isSubmitting ? 'सादर होत आहे...' : 'माहिती सादर करा'}
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="premium-card !p-20 flex flex-col items-center justify-center text-center space-y-8 bg-white/40 h-full border-dashed"
                            >
                                <div className="w-28 h-28 bg-white rounded-[40px] shadow-sm flex items-center justify-center text-slate-200 relative">
                                    <FileText size={56} />
                                    <div className="absolute top-0 right-0 w-8 h-8 bg-amber-400 rounded-full border-4 border-white animate-pulse" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">पूर्तता अहवाल सादर करा</h3>
                                    <p className="text-slate-500 max-w-sm mx-auto font-medium text-lg italic">
                                        प्रलंबित कामांपैकी एक निवडा आणि त्याबद्दलची माहिती आणि फोटो अपलोड करा.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
