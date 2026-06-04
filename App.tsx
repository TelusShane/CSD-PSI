/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ClipboardPlus, CheckCircle } from 'lucide-react';
import { Topic } from '../types';

interface TopicFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newTopic: Omit<Topic, 'id' | 'status' | 'date'>) => void;
}

export default function TopicForm({ isOpen, onClose, onSubmit }: TopicFormProps) {
  const [topic, setTopic] = useState('');
  const [submitter, setSubmitter] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Topic['category']>('Procedures');
  const [priority, setPriority] = useState<Topic['priority']>('Medium');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !submitter.trim()) return;

    onSubmit({
      topic: topic.trim(),
      submitter: submitter.trim(),
      description: description.trim(),
      category,
      priority,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTopic('');
      setSubmitter('');
      setDescription('');
      setCategory('Procedures');
      setPriority('Medium');
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="topic-form-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with motion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 z-10 shadow-[0_20px_50px_rgba(15,23,42,0.15)]"
          >
            <button
              id="close-modal-btn"
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-14 h-14 bg-telus-green rounded-full text-white flex items-center justify-center mb-5 shadow-sm shadow-[#2B8000]/25">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-1.5 font-display">TOPIC SUBMITTED!</h3>
                <p className="text-slate-500 text-sm">Thank you. Your topic has been added directly to the backlog.</p>
              </motion.div>
            ) : (
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="bg-[#4B286D]/10 text-telus-purple p-3 rounded-xl shadow-xs">
                    <ClipboardPlus className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[9px] font-bold tracking-widest text-slate-405 block uppercase">Suggestion Box</span>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight uppercase font-display">Suggest Topic</h2>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                      Topic / Objective Title
                    </label>
                    <input
                      id="topic-title-input"
                      type="text"
                      required
                      placeholder="e.g. Roof work ladder anchoring procedures"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-205 rounded-xl p-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-[#4B286D] focus:bg-white focus:ring-2 focus:ring-[#4B286D]/10 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                        Submitter Name
                      </label>
                      <input
                        id="submitter-input"
                        type="text"
                        required
                        placeholder="e.g. Shane Moews"
                        value={submitter}
                        onChange={(e) => setSubmitter(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-205 rounded-xl p-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-[#4B286D] focus:bg-white focus:ring-2 focus:ring-[#4B286D]/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                        Category
                      </label>
                      <select
                        id="category-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Topic['category'])}
                        className="w-full bg-slate-50 border border-slate-205 rounded-xl p-2.5 text-sm font-semibold text-slate-705 outline-none focus:border-[#4B286D] focus:bg-white focus:ring-2 focus:ring-[#4B286D]/10 transition-all"
                      >
                        <option value="Weather">Extreme Weather / Temp</option>
                        <option value="Equipment">Safety Equipment & PPE</option>
                        <option value="Procedures">Procedures & Safe Work</option>
                        <option value="Environmental">Environmental Hazards</option>
                        <option value="Other">Other Safety Topic</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                      Priority Level
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['Low', 'Medium', 'High', 'Critical'] as const).map((level) => {
                        const activeColorMap = {
                          Low: 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/10',
                          Medium: 'bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-600/10',
                          High: 'bg-orange-650 text-white border-orange-655 shadow-sm shadow-orange-600/10',
                          Critical: 'bg-red-700 text-white border-red-700 shadow-sm shadow-red-700/10',
                        };
                        const isActive = priority === level;
                        return (
                          <button
                            id={`priority-btn-${level.toLowerCase()}`}
                            key={level}
                            type="button"
                            onClick={() => setPriority(level)}
                            className={`py-2 text-xs font-bold rounded-lg uppercase tracking-wide border text-center transition-all cursor-pointer ${
                              isActive
                                ? activeColorMap[level]
                                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            {level}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1.5">
                      Context / Detailed Notes (Optional)
                    </label>
                    <textarea
                      id="description-input"
                      rows={3}
                      placeholder="Give a brief summary of the exact safety topic details..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-205 rounded-xl p-2.5 text-xs font-medium text-slate-705 outline-none focus:border-[#4B286D] focus:bg-white focus:ring-2 focus:ring-[#4B286D]/10 transition-all resize-none"
                    />
                  </div>

                  <div className="pt-3 flex gap-3">
                    <button
                      id="cancel-modal-btn"
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-2.5 border border-slate-205 rounded-xl font-bold bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-all text-xs tracking-wider uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      id="submit-modal-btn"
                      type="submit"
                      className="flex-1 py-2.5 bg-[#4B286D] hover:bg-[#3d1e5b] text-white font-bold rounded-xl transition-all text-xs tracking-wider uppercase shadow-md shadow-[#4B286D]/20 cursor-pointer border-0"
                    >
                      Submit Native Topic
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
