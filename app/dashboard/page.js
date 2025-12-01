'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Edit2, Save, X, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Input from '@/components/Input';
import Button from '@/components/Button';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Unauthorized');
        }

        const data = await response.json();
        setUser(data.user);
        setFormData({ name: data.user.name, email: data.user.email });
      } catch (err) {
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ name: user.name, email: user.email });
    setError('');
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Update failed');
      }

      setUser(result.user);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="page-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
          <p className="text-zinc-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-bg">
      <Navbar userName={user?.name} />
      
      <main className="flex items-center justify-center p-4 pt-24 pb-12">
        <div className="card max-w-lg w-full animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">My Profile</h1>
              <p className="text-zinc-400 text-sm mt-1">Manage your account information</p>
            </div>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-cyan-400 hover:text-cyan-300 
                           bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 
                           transition-all duration-200"
              >
                <Edit2 size={18} />
                <span className="hidden sm:inline">Edit</span>
              </button>
            )}
          </div>

          {error && (
            <div className="alert-error mb-6">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert-success mb-6">
              <CheckCircle size={20} />
              <span>{success}</span>
            </div>
          )}

          <div className="space-y-5">
            {isEditing ? (
              <>
                <Input
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  icon={<User size={20} />}
                />

                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  icon={<Mail size={20} />}
                />

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} isLoading={isSaving}>
                    <Save size={20} />
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={handleCancel} disabled={isSaving}>
                    <X size={20} />
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="profile-field">
                  <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center">
                      <User size={20} className="text-cyan-400" />
                    </div>
                    <span className="text-lg text-white">{user?.name}</span>
                  </div>
                </div>

                <div className="profile-field">
                  <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center">
                      <Mail size={20} className="text-cyan-400" />
                    </div>
                    <span className="text-lg text-white">{user?.email}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-800">
                  <p className="text-zinc-500 text-sm text-center">
                    Account ID: <span className="text-zinc-400 font-mono">{user?.id}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
