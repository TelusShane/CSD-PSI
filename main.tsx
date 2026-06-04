/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Clipboard, ShieldAlert, Plus, Trash2, CheckCircle2, User, HelpCircle, Flame, CloudLightning, Compass } from 'lucide-react';
import { Topic, AgendaItem } from '../types';
import React, { useState } from 'react';

interface DashboardTabProps {
  agenda: AgendaItem[];
  onAddAgendaItem: (item: Omit<AgendaItem, 'id'>) => void;
  onRemoveAgendaItem: (id: string) => void;
  onOpenSuggestModal: () => void;
  topics: Topic[];
  isFirebaseActive: boolean;
  onQuickSimulate: () => void;
}

export default function DashboardTab({
  agenda,
  onAddAgendaItem,
  onRemoveAgendaItem,
  onOpenSuggestModal,
  topics,
  isFirebaseActive,
  onQuickSimulate
}: DashboardTabProps) {
  const [newAgendaTitle, setNewAgendaTitle] = useState('');
  const [newAgendaSubmitter, setNewAgendaSubmitter] = useState('');
  const [newAgendaNotes, setNewAgendaNotes] = useState('');
  const [showAddAgenda, setShowAddAgenda] = useState(false);

  // Stats calculation
  const upcomingTopics = topics.filter((t) => t.status === 'Upcoming');
  const reviewedTopics = topics.filter((t) => t.status === 'Reviewed');
  const totalTopics = topics.length;
  const closedCount = reviewedTopics.length;
  const openCount = upcomingTopics.length;
  const pace = totalTopics > 0 ? Math.round((closedCount / totalTopics) * 100) : 0;

  const handleAddAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgendaTitle.trim() || !newAgendaSubmitter.trim()) return;
    onAddAgendaItem({
      item: newAgendaTitle.trim(),
      submitter: newAgendaSubmitter.trim(),
      notes: newAgendaNotes.trim(),
    });
    setNewAgendaTitle('');
    setNewAgendaSubmitter('');
    setNewAgendaNotes('');
    setShowAddAgenda(false);
  };

  const getPriorityIcon = (priority: Topic['priority']) => {
    switch (priority) {
      case 'Critical':
        return <Flame className="w-3.5 h-3.5 text-red-600 animate-pulse" />;
      case 'High':
        return <ShieldAlert className="w-3.5 h-3.5 text-orange-650" />;
      case 'Medium':
        return <CloudLightning className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Compass className="w-3.5 h-3.5 text-emerald-600" />;
    }
  };

  return (
    <div id="dashboard-tab" className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-2 animate-in fade-in duration-353">
      {/* Left Area: Agenda and Live Topic Activity */}
      <div className="lg:col-span-8 space-y-8">
        
        {/* Agenda Section */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="bg-[#4B286D] p-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-base font-bold text-white flex items-center gap-3 font-display tracking-tight">
              <Clipboard className="w-5 h-5 text-purple-200" />
              CURRENT INTERLOCK AGENDA
            </h2>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white/10 rounded-full text-white text-[10px] font-bold uppercase tracking-wider">
                {agenda.length} ITEMS
              </span>
              <button
                id="toggle-add-agenda-btn"
                onClick={() => setShowAddAgenda(!showAddAgenda)}
                className="bg-[#2B8000] hover:bg-[#206000] text-white px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all outline-none"
              >
                <Plus className="w-3.5 h-3.5" />
                {showAddAgenda ? 'Close' : 'Add Item'}
              </button>
            </div>
          </div>

          {/* Add Agenda Item inline Form */}
          {showAddAgenda && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="p-6 border-b border-slate-100 bg-slate-50/50 space-y-4"
            >
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Add Agenda Topic</h3>
              <form onSubmit={handleAddAgenda} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <input
                    id="new-agenda-title"
                    type="text"
                    required
                    placeholder="Topic Title (e.g. Safety vest deployment)"
                    value={newAgendaTitle}
                    onChange={(e) => setNewAgendaTitle(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 outline-none focus:border-[#4B286D] focus:ring-2 focus:ring-[#4B286D]/10 transition-all"
                  />
                </div>
                <div>
                  <input
                    id="new-agenda-submitter"
                    type="text"
                    required
                    placeholder="Submitter (e.g. Shane)"
                    value={newAgendaSubmitter}
                    onChange={(e) => setNewAgendaSubmitter(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 outline-none focus:border-[#4B286D] focus:ring-2 focus:ring-[#4B286D]/10 transition-all"
                  />
                </div>
                <div className="md:col-span-3">
                  <textarea
                    id="new-agenda-notes"
                    placeholder="Brief description / notes for this topic..."
                    value={newAgendaNotes}
                    onChange={(e) => setNewAgendaNotes(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-700 outline-none focus:border-[#4B286D] focus:ring-2 focus:ring-[#4B286D]/10 transition-all"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-3 flex justify-end gap-2 pt-1">
                  <button
                    id="cancel-add-agenda-btn"
                    type="button"
                    onClick={() => setShowAddAgenda(false)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-100 uppercase transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    id="submit-add-agenda-btn"
                    type="submit"
                    className="px-4 py-2 bg-[#4B286D] text-white text-xs font-bold hover:bg-[#3d1f59] rounded-lg uppercase transition-all"
                  >
                    Save to Agenda
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="divide-y divide-slate-105">
            {agenda.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <HelpCircle className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                <p className="font-bold text-base text-slate-700">No Items Active on Current Agenda</p>
                <p className="text-xs text-slate-500 mt-1">Click "Add Item" or promote suggestions below!</p>
              </div>
            ) : (
              agenda.map((item, idx) => (
                <div key={item.id} className="p-6 sm:p-8 hover:bg-slate-50/40 transition-all group flex items-start gap-5 relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-sm group-hover:bg-[#4B286D] group-hover:text-white transition-colors">
                    {idx + 1}
                  </div>
                  <div className="flex-grow pr-10">
                    <h3 className="font-bold text-slate-800 text-base md:text-lg tracking-tight mb-1">
                      {item.item}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-normal">{item.notes}</p>
                    <div className="mt-3 flex flex-wrap gap-2 items-center">
                      <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {item.submitter}
                      </span>
                      {item.duration && (
                        <span className="text-[9px] font-bold text-slate-550 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {item.duration}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    id={`remove-agenda-item-${item.id}`}
                    onClick={() => onRemoveAgendaItem(item.id)}
                    className="absolute right-6 top-8 text-slate-300 hover:text-red-650 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-1.5 rounded-full hover:bg-red-50"
                    title="Remove from agenda"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Live Top Safety Submissions Summary (Recent Backlog) */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <span className="text-[9px] font-bold uppercase text-[#2B8000] tracking-widest block mb-1">
                Backlog Highlights
              </span>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase font-display">
                Awaiting Discussion Backlog
              </h3>
            </div>
            {totalTopics === 0 && (
              <button
                id="quick-simulate-btn"
                onClick={onQuickSimulate}
                className="text-xs bg-[#2B8000]/10 text-[#2B8000] px-3 py-1.5 font-bold hover:bg-[#2B8000]/20 transition-all rounded-lg uppercase"
              >
                Seed Sample Topics
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingTopics.slice(0, 4).map((topic) => (
              <div
                key={topic.id}
                className="p-5 bg-slate-50 border border-[#4B286D]/10 rounded-xl flex flex-col justify-between hover:bg-white hover:border-[#4B286D]/25 transition-all hover:shadow-xs group"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="text-[9px] font-bold text-slate-400 bg-white border border-slate-100 px-2 py-0.5 rounded-md uppercase">
                      {topic.category}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-bold text-slate-500 bg-white border border-slate-100 px-2 py-0.5 rounded-md uppercase">
                      {getPriorityIcon(topic.priority)}
                      {topic.priority}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-800 text-sm mb-2 line-clamp-2">
                    {topic.topic}
                  </p>
                </div>
                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 pt-2 border-t border-slate-100 mt-2">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-400" /> {topic.submitter}
                  </span>
                  <span>{topic.date}</span>
                </div>
              </div>
            ))}
            {upcomingTopics.length === 0 && (
              <div className="md:col-span-2 text-center py-8 text-slate-400">
                <CheckCircle2 className="w-8 h-8 text-[#2B8000] mx-auto mb-2" />
                <p className="font-bold text-sm text-slate-750">Perfect! Backlog is empty.</p>
                <p className="text-xs">Have safety items or hazard concerns? Suggest a topic.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Right Area: Sidebar containing Suggest Topic action, Status progress bar & Connection status */}
      <div className="lg:col-span-4 space-y-8">
        
        {/* Suggest Topic Action - Replacer of Google Forms */}
        <div className="bg-[#54595F] rounded-2xl p-6 sm:p-8 text-white border-b-4 border-[#2B8050] shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold mb-3 flex flex-col gap-1 font-display">
              <span className="text-[#2B8000] text-[10px] uppercase tracking-[0.3em] font-black">Interactive</span>
              NATIVE SUGGESTION
            </h4>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed font-normal">
              We have replaced Google Forms! Contribute directly to our safety standards using our safe interactive form.
            </p>
          </div>
          <button
            id="launch-native-form-btn"
            onClick={onOpenSuggestModal}
            className="bg-[#4B286D] hover:bg-[#3d1f59] text-white w-full py-3.5 rounded-xl font-bold transition-all active:scale-[0.98] uppercase tracking-wider text-xs shadow-md shadow-[#4B286D]/20 flex items-center justify-center gap-2 cursor-pointer border-0"
          >
            Suggest Safety Topic Now
          </button>
        </div>

        {/* Outstanding Topics Progress Widget */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#2B8000]/10 text-[#2B8000] p-2.5 rounded-xl">
              <Clipboard className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest font-display">Topics Statistics</h4>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Reviewed Rate</span>
                <span className="text-xl font-semibold text-[#2B8000] font-display">{pace}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="bg-[#2B8000] h-full rounded-full transition-all duration-500"
                  style={{ width: `${pace}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
              <div className="text-center">
                <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Reviewed</span>
                <span className="text-2xl font-bold text-slate-800 font-display">
                  {String(closedCount).padStart(2, '0')}
                </span>
              </div>
              <div className="text-center border-l border-slate-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Upcoming</span>
                <span className="text-2xl font-bold text-orange-600 font-display">
                  {String(openCount).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Database Status Indicator widget */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            Durable Cloud Sync
          </p>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 font-bold text-[10px] border rounded-full ${
              isFirebaseActive
                ? 'bg-[#2B8000]/10 border-[#2B8000]/30 text-[#2B8000]'
                : 'bg-slate-100 border-slate-200 text-slate-650'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isFirebaseActive ? 'bg-[#2B8000] animate-pulse' : 'bg-slate-450'
              }`}
            ></span>
            {isFirebaseActive ? 'FIRESTORE CLOUD INTEGRATION ACTIVE' : 'SECURE OFFLINE SYSTEM'}
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium leading-relaxed">
            {isFirebaseActive
              ? 'Synchronized across all safety partners in real-time.'
              : 'Local persistent storage active. Setting up Firebase synchronizes discussions.'}
          </p>
        </div>

      </div>
    </div>
  );
}
