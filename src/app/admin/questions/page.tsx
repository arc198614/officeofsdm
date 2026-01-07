import { getQuestions } from '@/lib/google/sheets';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    ClipboardCheck,
    ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function QuestionMaster() {
    const questions = await getQuestions();

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">प्रश्न मास्टर (Question Bank)</h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium">येथे आपण तपासणीसाठी वापरले जाणारे प्रश्न आणि गुण मॅनेज करू शकता.</p>
                </div>
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
                    <Plus size={20} />
                    प्रश्न जोडा
                </button>
            </div>

            <div className="premium-card !p-0 overflow-hidden">
                <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="प्रश्न किंवा विभाग शोधा..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium"
                        />
                    </div>
                    <button className="px-5 py-3 border border-slate-200 rounded-xl flex items-center gap-2 font-bold text-slate-600 bg-white hover:bg-slate-50 transition-all">
                        <Filter size={18} />
                        फिल्टर
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 border-b border-slate-100">
                                <th className="px-8 py-5"># ID</th>
                                <th className="px-8 py-5">विभाग (Department)</th>
                                <th className="px-8 py-5">प्रश्न तपशील</th>
                                <th className="px-8 py-5">अनिवार्य?</th>
                                <th className="px-8 py-5">कमाल गुण</th>
                                <th className="px-8 py-5 text-center">कृती</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {questions.map((q, i) => (
                                <tr key={q.id} className="hover:bg-indigo-50/20 transition-colors group">
                                    <td className="px-8 py-6 font-black text-slate-400 text-sm italic">#{q.id}</td>
                                    <td className="px-8 py-6">
                                        <span className={cn(
                                            "px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider",
                                            q.department === 'महसूल' ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                                        )}>
                                            {q.department}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="font-bold text-slate-800 leading-relaxed max-w-md">{q.text}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        {q.mandatory ? (
                                            <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase italic">
                                                <ShieldAlert size={14} /> होय
                                            </div>
                                        ) : (
                                            <span className="text-slate-400 text-xs font-bold uppercase italic">नाही</span>
                                        )}
                                    </td>
                                    <td className="px-8 py-6 font-black text-slate-900 text-lg">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            {q.marks}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100">
                                            <MoreVertical size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {questions.length === 0 && (
                    <div className="p-20 text-center space-y-4">
                        <div className="w-20 h-20 bg-slate-100 rounded-3xl mx-auto flex items-center justify-center text-slate-300">
                            <ClipboardCheck size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 tracking-tight">कोणतेही प्रश्न सापडले नाहीत</h3>
                        <p className="text-slate-400 font-medium">कृपया गुगल शीट तपासा किंवा नवीन प्रश्न जोडा.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
