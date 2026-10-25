import React, { useEffect, useRef, useState } from 'react';
import {
  Search,
  Send,
  Mic,
  Square,
  Camera,
  MapPin,
  ThumbsUp,
  ThumbsDown,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import type { AuditLogEntry, CitizenCase } from '../services/caseService';
import { apiAttachTicketMedia, apiSubmitTicket, apiTrackTicket, apiVerifyTicket } from '../services/ticketApi';
import { apiListDistricts, apiListStates } from '../services/geoApi';
import { fileToDataUrl, uploadTicketMedia } from '../services/mediaUpload';
import { CITIZEN_STATUS_LABEL, isValidIndianMobile, type CaseStatus } from '../utils/ticketLogic';
import type { GeoDistrict, GeoState } from '../services/geoService';

interface CitizenTrackPortalProps {
  initialTrackingId?: string;
}

const CATEGORIES: CitizenCase['category'][] = [
  'Bridges & Culverts',
  'Piped Drinking Water',
  'Rural Roads & Connectivity',
  'Healthcare Sub-Center',
  'Power & Electrification',
  'Sanitation & Drainage',
];

export const CitizenTrackPortal: React.FC<CitizenTrackPortalProps> = ({ initialTrackingId }) => {
  const [screen, setScreen] = useState<'submit' | 'track'>(initialTrackingId ? 'track' : 'submit');
  const [trackingId, setTrackingId] = useState(initialTrackingId || '');
  const [last4, setLast4] = useState('');
  const [currentCase, setCurrentCase] = useState<CitizenCase | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [newId, setNewId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [stateName, setStateName] = useState('');
  const [states, setStates] = useState<GeoState[]>([]);
  const [districts, setDistricts] = useState<GeoDistrict[]>([]);
  const [stateCode, setStateCode] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<CitizenCase['category']>('Bridges & Culverts');
  const [submitting, setSubmitting] = useState(false);
  const [photoData, setPhotoData] = useState<string>('');
  const [voiceData, setVoiceData] = useState<string>('');
  const [recording, setRecording] = useState(false);
  const mediaRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [lat, setLat] = useState<number | undefined>();
  const [lng, setLng] = useState<number | undefined>();
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (initialTrackingId) {
      setTrackingId(initialTrackingId);
      setScreen('track');
    }
  }, [initialTrackingId]);

  useEffect(() => {
    void apiListStates().then(setStates);
  }, []);

  useEffect(() => {
    if (!stateCode) {
      setDistricts([]);
      setDistrict('');
      return;
    }
    setDistrict('');
    void apiListDistricts(Number(stateCode)).then(setDistricts);
  }, [stateCode]);

  const shareUrl = (id: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'citizen');
    url.searchParams.set('id', id);
    return url.toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const missing: string[] = [];
    if (!title.trim()) missing.push('title');
    if (!description.trim()) missing.push('description');
    if (!stateName.trim()) missing.push('state');
    if (!district.trim()) missing.push('district');
    if (!phone.trim()) missing.push('mobile');
    if (missing.length) {
      setError(`Please fill ${missing.join(', ')}.`);
      return;
    }
    if (!isValidIndianMobile(phone)) {
      setError('Enter a valid 10-digit Indian mobile starting with 6, 7, 8, or 9.');
      return;
    }
    setSubmitting(true);
    try {
      const created = await apiSubmitTicket({
        title: title.trim(),
        description: description.trim(),
        category,
        district: district.trim(),
        state: stateName.trim(),
        village: village.trim(),
        contactNumber: phone.trim(),
        channel: 'Web Citizen Portal',
        spokenDialect: 'Hindi / Vernacular',
        lat,
        lng,
      });
      const digits = phone.replace(/\D/g, '').slice(-4);
      let attached = created.case;
      if (voiceData || photoData) {
        const voiceUrl = voiceData ? await uploadTicketMedia(created.trackingId, 'voice', voiceData) : undefined;
        const photoUrl = photoData ? await uploadTicketMedia(created.trackingId, 'photo', photoData) : undefined;
        attached = await apiAttachTicketMedia(created.trackingId, digits, { voiceUrl, photoUrl });
      }
      setNewId(created.trackingId);
      setTrackingId(created.trackingId);
      setLast4(digits);
      setCurrentCase(attached);
      setScreen('track');
      await handleTrack(created.trackingId, digits);
    } catch (err: any) {
      setError(err.message || 'Could not submit');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrack = async (id = trackingId, digits = last4) => {
    if (!id.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await apiTrackTicket(id.trim(), digits.trim() || undefined);
      setCurrentCase(res.case);
      setAuditLogs(res.auditLogs);
      if (!res.case) setError('Ticket not found');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (ev) => {
        if (ev.data.size) chunksRef.current.push(ev.data);
      };
      rec.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onload = () => setVoiceData(String(reader.result || ''));
        reader.readAsDataURL(blob);
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRef.current = rec;
      rec.start();
      setRecording(true);
      setError(null);
    } catch {
      setError('Microphone permission is required to record a voice note.');
    }
  };

  const stopRecording = () => {
    mediaRef.current?.stop();
    setRecording(false);
  };

  const clearVoice = () => {
    if (recording) stopRecording();
    setVoiceData('');
  };

  const onPhoto = async (file?: File) => {
    if (!file) return;
    setPhotoData(await fileToDataUrl(file));
  };

  const useMyLocation = () => {
    navigator.geolocation?.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLng(pos.coords.longitude);
    });
  };

  const handleVerify = async (yes: boolean) => {
    if (!currentCase) return;
    setVerifying(true);
    setError(null);
    try {
      const updated = await apiVerifyTicket(
        currentCase.trackingId,
        last4,
        yes,
        yes ? 'Citizen confirmed the work is done.' : 'Citizen says the problem remains.'
      );
      setCurrentCase(updated);
      await handleTrack(currentCase.trackingId, last4);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setVerifying(false);
    }
  };

  const status = (currentCase?.status || 'submitted') as CaseStatus;
  const canConfirm = currentCase?.status === 'proof_uploaded';

  return (
    <div className="max-w-lg mx-auto space-y-5 pb-24">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-gov-teal">Citizen</p>
        <h2 className="text-2xl sm:text-3xl font-black text-gov-text leading-tight">
          My Voice / My Ticket
        </h2>
        <p className="text-sm text-gov-muted">
          File a need. Get a public ID. Track it. Confirm when work is done. No login.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setScreen('submit')}
          className={`min-h-11 rounded-sm font-bold text-sm ${
            screen === 'submit' ? 'bg-gov-teal text-white' : 'bg-gov-inset text-gov-text border border-gov-border'
          }`}
        >
          Raise a need
        </button>
        <button
          type="button"
          onClick={() => setScreen('track')}
          className={`min-h-11 rounded-sm font-bold text-sm ${
            screen === 'track' ? 'bg-gov-teal text-white' : 'bg-gov-inset text-gov-text border border-gov-border'
          }`}
        >
          Track ticket
        </button>
      </div>

      {error && (
        <div className="rounded-sm border border-gov-error bg-gov-error-bg px-3 py-2 text-sm text-gov-error">{error}</div>
      )}

      {screen === 'submit' && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gov-card border border-gov-border rounded-sm p-4">
          <label className="block space-y-1">
            <span className="text-sm font-semibold text-gov-text">What is broken?</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full min-h-11 rounded-sm bg-gov-inset border border-gov-border px-3 text-gov-text"
              placeholder="e.g. Culvert washed away"
              required
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-semibold text-gov-text">Describe in your words</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-sm bg-gov-inset border border-gov-border px-3 py-2 text-gov-text"
              required
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-semibold text-gov-text">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CitizenCase['category'])}
              className="w-full min-h-11 rounded-sm bg-gov-inset border border-gov-border px-3 text-gov-text"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-semibold text-gov-text">State</span>
            <select
              value={stateCode}
              onChange={(e) => {
                const code = e.target.value;
                setStateCode(code);
                const match = states.find((s) => String(s.lgdCode) === code);
                setStateName(match?.name || '');
              }}
              className="w-full min-h-11 rounded-sm bg-gov-inset border border-gov-border px-3 text-gov-text"
              required
            >
              <option value="">Select state or UT</option>
              {states.map((s) => (
                <option key={s.lgdCode} value={s.lgdCode}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block space-y-1">
              <span className="text-sm font-semibold text-gov-text">District</span>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full min-h-11 rounded-sm bg-gov-inset border border-gov-border px-3 text-gov-text"
                required
                disabled={!stateCode}
              >
                <option value="">{stateCode ? 'Select district' : 'Select state first'}</option>
                {districts.map((d) => (
                  <option key={d.lgdCode} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-1">
              <span className="text-sm font-semibold text-gov-text">Village</span>
              <input value={village} onChange={(e) => setVillage(e.target.value)} className="w-full min-h-11 rounded-sm bg-gov-inset border border-gov-border px-3 text-gov-text" />
            </label>
          </div>
          <label className="block space-y-1">
            <span className="text-sm font-semibold text-gov-text">Mobile (required)</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="tel"
              autoComplete="tel"
              maxLength={15}
              placeholder="10-digit mobile, e.g. 98765 43210"
              aria-required="true"
              className="w-full min-h-11 rounded-sm bg-gov-inset border border-gov-border px-3 text-gov-text"
              required
            />
            <span className="text-xs text-gov-muted">Indian mobile starting with 6, 7, 8 or 9. Last 4 digits unlock tracking.</span>
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={useMyLocation} className="min-h-11 px-3 rounded-sm bg-gov-inset border border-gov-border text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4" /> Use my location
            </button>
            <label className="min-h-11 px-3 rounded-sm bg-gov-inset border border-gov-border text-sm flex items-center gap-2 cursor-pointer">
              <Camera className="w-4 h-4" /> Photo
              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => onPhoto(e.target.files?.[0])} />
            </label>
            <button
              type="button"
              onClick={recording ? stopRecording : startRecording}
              className="min-h-11 px-3 rounded-sm bg-gov-inset border border-gov-border text-sm flex items-center gap-2"
            >
              {recording ? <Square className="w-4 h-4 text-gov-error" /> : <Mic className="w-4 h-4" />}
              {recording ? 'Stop voice' : voiceData ? 'Record again' : 'Voice note'}
            </button>
          </div>
          {recording && (
            <p className="text-sm text-gov-error font-semibold">Recording… tap Stop, then play it back to check.</p>
          )}
          {voiceData && !recording && (
            <div className="space-y-2 border border-gov-border bg-gov-inset p-3">
              <p className="text-sm font-semibold text-gov-navy">Check your voice note</p>
              <audio controls src={voiceData} className="w-full">
                Your browser does not support audio.
              </audio>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={startRecording} className="min-h-11 px-3 rounded-sm bg-gov-navy text-white text-sm font-semibold">
                  Record again
                </button>
                <button type="button" onClick={clearVoice} className="min-h-11 px-3 rounded-sm bg-gov-inset border border-gov-border text-sm font-semibold">
                  Remove voice
                </button>
              </div>
            </div>
          )}
          {(photoData || lat) && (
            <p className="text-xs text-gov-success">
              {photoData && 'Photo attached. '}
              {lat && lng && `Pin ${lat.toFixed(3)}, ${lng.toFixed(3)}`}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full min-h-12 rounded-sm bg-gov-teal text-white font-black flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            {submitting ? 'Saving…' : 'Submit and get tracking ID'}
          </button>
        </form>
      )}

      {screen === 'track' && (
        <div className="space-y-4">
          {newId && (
            <div className="rounded-sm border border-gov-success bg-gov-success-bg p-4 space-y-2">
              <p className="text-xs uppercase font-bold text-gov-success">Your tracking ID</p>
              <p className="text-xl font-black text-gov-text break-all">{newId}</p>
              <button
                type="button"
                className="min-h-11 px-3 rounded-sm bg-gov-inset text-sm flex items-center gap-2"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl(newId));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Copy track link
              </button>
            </div>
          )}

          <div className="bg-gov-card border border-gov-border rounded-sm p-4 space-y-3">
            <label className="block space-y-1">
              <span className="text-sm font-semibold text-gov-text">Ticket ID</span>
              <input
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full min-h-11 rounded-sm bg-gov-inset border border-gov-border px-3 text-gov-text font-mono"
                placeholder="SETU-2026-…"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-sm font-semibold text-gov-text">Last 4 digits of phone</span>
              <input
                value={last4}
                onChange={(e) => setLast4(e.target.value)}
                maxLength={4}
                inputMode="numeric"
                className="w-full min-h-11 rounded-sm bg-gov-inset border border-gov-border px-3 text-gov-text"
              />
            </label>
            <button
              type="button"
              onClick={() => handleTrack()}
              disabled={loading}
              className="w-full min-h-12 rounded-sm bg-gov-navy text-white font-bold flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              {loading ? 'Looking up…' : 'Show my ticket'}
            </button>
          </div>

          {currentCase && (
            <div className="bg-gov-card border border-gov-border rounded-sm p-4 space-y-3">
              <p className="text-xs font-mono text-gov-teal">{currentCase.trackingId}</p>
              <h3 className="text-lg font-black text-gov-text">{currentCase.title}</h3>
              <p className="text-sm text-gov-muted">{currentCase.description}</p>
              <div className="inline-flex min-h-10 items-center px-3 rounded-full bg-gov-teal-soft text-gov-navy text-sm font-bold border border-gov-teal">
                {CITIZEN_STATUS_LABEL[status]}
              </div>
              <p className="text-xs text-gov-muted">
                {currentCase.village ? `${currentCase.village}, ` : ''}
                {currentCase.district}, {currentCase.state}
              </p>
              {(currentCase.photoUrl || currentCase.voiceUrl) && (
                <div className="space-y-2 border border-gov-border bg-gov-inset p-3">
                  <p className="text-sm font-semibold text-gov-navy">Your submitted media</p>
                  {currentCase.photoUrl && (
                    <img src={currentCase.photoUrl} alt="Citizen submitted photo" className="rounded-sm max-h-56 w-full object-cover" />
                  )}
                  {currentCase.voiceUrl && (
                    <audio controls src={currentCase.voiceUrl} className="w-full">
                      Your browser does not support audio.
                    </audio>
                  )}
                </div>
              )}
              {currentCase.completionProof?.photoUrl && (
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gov-navy">Officer proof</p>
                  <img src={currentCase.completionProof.photoUrl} alt="Officer proof" className="rounded-sm max-h-56 w-full object-cover" />
                </div>
              )}
              {canConfirm && (
                <div className="space-y-2 pt-2">
                  <p className="text-sm font-semibold text-gov-text">Did the work get done?</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      disabled={verifying}
                      onClick={() => handleVerify(true)}
                      className="min-h-12 rounded-sm bg-gov-success text-white font-bold flex items-center justify-center gap-2"
                    >
                      <ThumbsUp className="w-4 h-4" /> Yes
                    </button>
                    <button
                      type="button"
                      disabled={verifying}
                      onClick={() => handleVerify(false)}
                      className="min-h-12 rounded-sm bg-gov-error text-white font-bold flex items-center justify-center gap-2"
                    >
                      <ThumbsDown className="w-4 h-4" /> No
                    </button>
                  </div>
                </div>
              )}
              {auditLogs.length > 0 && (
                <ol className="space-y-2 text-xs text-gov-muted border-t border-gov-border pt-3">
                  {auditLogs.map((log, i) => (
                    <li key={`${log.timestamp}-${i}`}>
                      <span className="text-gov-muted">{new Date(log.timestamp).toLocaleString()}</span>
                      {' — '}
                      <span className="text-gov-text">{log.action}</span>
                      {log.details && log.details !== log.action ? `: ${log.details}` : ''}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
