import { getInspectionLogs } from '@/lib/google/sheets';
import {
    Calendar,
    User,
    MapPin,
    Eye,
    Download,
    CheckCircle,
    Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function InspectionLog() {
    const logs = await getInspectionLogs();

    return (
        <div className="space-y-8 animate-fade-in">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-900">तपासणी नोंदणी (Inspection Logs)</h1>
                    <p className="text-slate-500 mt-2 text-lg font-medium italic">प्रणाली मधील सर्व झालेल्या आणि प्रलंबित तपासण्यांची माहिती.</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-3 border border-slate-200 rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-50 bg-white transition-all shadow-sm">
                        <Download size={20} />
                        Excel डाउनलोड
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-6">
                {logs.map((log) => (
                    <div key={log.id} className="premium-card !p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group">
                        <div className="flex items-center gap-8 flex-1">
                            <div className={cn(
                                "w-16 h-16 rounded-3xl flex flex-col items-center justify-center font-black transition-all group-hover:scale-110",
                                log.status === 'COMPLETED' || log.status === 'पूर्ण' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                            )}>
                                <span className="text-[10px] uppercase opacity-60">ID</span>
                                <span className="text-lg leading-none">{log.id.slice(-4)}</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">सजा: {log.saja}</h3>
                                    <span className={cn(
                                        "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                                        log.status === 'COMPLETED' || log.status === 'पूर्ण' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                                    )}>
                                        {log.status}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-slate-400">
                                    <div className="flex items-center gap-2 italic">
                                        <Calendar size={16} /> {log.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User size={16} /> ग्राम महसूल अधिकारी: {log.vro}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} /> तपासणी अधिकारी: {log.officer}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto self-end md:self-center">
                            <button className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2">
                                <Eye size={18} /> तपशील पहा
                            </button>
                            <button className="flex-1 md:flex-none px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-100 transition-all flex items-center justify-center gap-2">
                                <CheckCircle size={18} /> रिपोरट
                            </button>
                        </div>
                    </div>
                ))}

                {logs.length === 0 && (
                    <div className="premium-card !p-20 text-center space-y-4 bg-white/50">
                        <div className="w-20 h-20 bg-slate-100 rounded-full mx-auto flex items-center justify-center text-slate-300 border-4 border-white shadow-inner">
                            <Clock size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight italic">आज कोणतीही तपासणी झालेली नाही</h3>
                        <p className="text-slate-500 font-medium opacity-70">नवीन तपासणी सुरू करण्यासाठी वर असलेल्या 'नवीन तपासणी' बटणावर क्लिक करा.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
