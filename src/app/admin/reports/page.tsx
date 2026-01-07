'use client';

import React from 'react';
import {
    Download,
    FileSpreadsheet,
    FileText,
    Calendar,
    Filter,
    BarChart3,
    ArrowRight,
    Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Reports() {
    const reportCategories = [
        {
            title: 'दप्तर तपासणी अहवाल',
            description: 'सर्व झालेल्या तपासण्यांची एकत्रित माहिती (Excel/PDF)',
            icon: FileSpreadsheet,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            action: () => alert('Excel अहवाल तयार होत आहे...')
        },
        {
            title: 'सजा निहाय आकडेवारी',
            description: 'प्रत्येक सजाची पूर्तता आणि प्रलंबित कामे',
            icon: BarChart3,
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            action: () => alert('सजा अहवाल तयार होत आहे...')
        },
        {
            title: 'त्रुटी आणि पूर्तता विश्लेषण',
            description: 'सर्वाधिक आढळणाऱ्या त्रुटी आणि त्यांचे विश्लेषण',
            icon: FileText,
            color: 'text-indigo-600',
            bg: 'bg-indigo-50',
            action: () => alert('विश्लेषण अहवाल तयार होत आहे...')
        },
        {
            title: 'मासिक प्रगती अहवाल',
            description: 'महिन्याकाठी झालेल्या सुधारणांचा आढावा',
            icon: Calendar,
            color: 'text-purple-600',
            bg: 'bg-purple-50',
            action: () => alert('मासिक अहवाल तयार होत आहे...')
        }
    ];

    return (
        <div className="space-y-10 animate-fade-in">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">प्रगत अहवाल केंद्र (Advanced Reports)</h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium italic">प्रणालीमधील माहितीवरून अचूक अहवाल एका क्लिकवर तयार करा.</p>
                </div>
                <div className="flex gap-4">
                    <button className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 font-black text-lg">
                        <Download size={24} />
                        सर्व अहवाल झिप करा
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reportCategories.map((report, idx) => {
                    const Icon = report.icon;
                    return (
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            key={idx}
                            onClick={report.action}
                            className="premium-card !p-10 flex items-start gap-8 cursor-pointer group"
                        >
                            <div className={cn("p-6 rounded-[32px] shrink-0 group-hover:scale-110 transition-transform shadow-sm", report.bg)}>
                                <Icon className={report.color} size={40} />
                            </div>
                            <div className="space-y-3 flex-1">
                                <h3 className="text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight">
                                    {report.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed font-bold italic text-lg opacity-80">
                                    {report.description}
                                </p>
                                <div className="flex items-center gap-3 text-indigo-600 font-black pt-4 translate-x-[-10px] group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all text-sm uppercase tracking-widest">
                                    डाउनलोड सुरू करा <ArrowRight size={18} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="gradient-bg rounded-[48px] p-12 text-white overflow-hidden relative shadow-3xl">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-3xl font-black italic">महत्त्वाची टीप:</h2>
                        <div className="space-y-4">
                            {[
                                'सर्व अहवाल गुगल शीटवरील ताज्या माहितीनुसार रियल-टाइममध्ये तयार केले जातात.',
                                'जर माहिती जुनी दिसत असेल तर गुगल शीटमध्ये "Refresh" बटण दाबा.',
                                'PDF अहवालासाठी तुमचे इंटरनेट कनेक्शन सक्रिय असणे आवश्यक आहे.'
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-4 text-white/80 font-bold text-lg">
                                    <div className="w-2 h-2 rounded-full bg-indigo-300 shadow-glow" />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-3xl rounded-[40px] p-10 border border-white/20 flex flex-col items-center gap-6 text-center">
                        <Search className="text-white/40" size={48} />
                        <div>
                            <div className="text-sm font-black uppercase tracking-[0.3em] text-indigo-200">एकूण व्युव्हज</div>
                            <div className="text-6xl font-black mt-2 tabular-nums">४,५९०</div>
                        </div>
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[120px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/20 rounded-full blur-[100px] -ml-20 -mb-20" />
            </div>
        </div>
    );
}
