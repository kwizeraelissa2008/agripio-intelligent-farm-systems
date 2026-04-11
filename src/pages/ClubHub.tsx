import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { Users, Calendar, Award, BookOpen, CheckCircle, Star, MapPin } from 'lucide-react';

interface ClubMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  joined_date: string;
  sessions_attended: number;
  expertise: string[];
  is_team: boolean;
}

interface Session {
  id: string;
  title: string;
  date: string;
  attendees: number;
  topic: string;
}

export default function ClubHub() {
  const { user } = useAuth();
  const [members, setMembers] = useState<ClubMember[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'members' | 'sessions' | 'resources'>('members');

  useEffect(() => {
    // Mock data - in real app, fetch from Supabase
    setMembers([
      // Our core team
      { id: '1', name: 'KWIZERA Elissa', role: 'Team Lead', avatar: '👩‍🌾', joined_date: '2024-01-01', sessions_attended: 45, expertise: ['IP Rights', 'Crop Management'], is_team: true },
      { id: '2', name: 'INEZA Elyon Ivo', role: 'Tech Lead', avatar: '👨‍💻', joined_date: '2024-01-01', sessions_attended: 42, expertise: ['IoT Systems', 'Data Analysis'], is_team: true },
      { id: '3', name: 'INEZA Aliza', role: 'Content Lead', avatar: '👩‍🏫', joined_date: '2024-01-01', sessions_attended: 38, expertise: ['Education', 'Copyright'], is_team: true },
      { id: '4', name: 'ISHIMWE Ornella', role: 'Research Lead', avatar: '👩‍🔬', joined_date: '2024-01-01', sessions_attended: 40, expertise: ['Agricultural Research', 'IP Protection'], is_team: true },
      
      // Additional club members
      { id: '5', name: 'MUTANGANA Jean', role: 'Member', avatar: '👨‍🌾', joined_date: '2024-02-15', sessions_attended: 12, expertise: ['Maize Farming'], is_team: false },
      { id: '6', name: 'MUKAMANA Grace', role: 'Member', avatar: '👩‍🌾', joined_date: '2024-02-20', sessions_attended: 15, expertise: ['Bean Cultivation'], is_team: false },
      { id: '7', name: 'NTWARI Paul', role: 'Member', avatar: '👨‍🌾', joined_date: '2024-03-01', sessions_attended: 10, expertise: ['Coffee Farming'], is_team: false },
      { id: '8', name: 'NYIRAHABIMANA Aline', role: 'Member', avatar: '👩‍🌾', joined_date: '2024-03-10', sessions_attended: 8, expertise: ['Vegetable Farming'], is_team: false },
      { id: '9', name: 'HABIMANA Joseph', role: 'Member', avatar: '👨‍🌾', joined_date: '2024-03-15', sessions_attended: 11, expertise: ['Rice Cultivation'], is_team: false },
      { id: '10', name: 'MUKANYANDWI Esther', role: 'Member', avatar: '👩‍🌾', joined_date: '2024-03-20', sessions_attended: 9, expertise: ['Organic Farming'], is_team: false },
      { id: '11', name: 'NTWARI Samuel', role: 'Member', avatar: '👨‍🌾', joined_date: '2024-04-01', sessions_attended: 7, expertise: ['Irrigation Systems'], is_team: false },
      { id: '12', name: 'MUKAMWEZI Chantal', role: 'Member', avatar: '👩‍🌾', joined_date: '2024-04-05', sessions_attended: 6, expertise: ['Pest Management'], is_team: false },
      { id: '13', name: 'HABIMANA Fabrice', role: 'Member', avatar: '👨‍🌾', joined_date: '2024-04-10', sessions_attended: 8, expertise: ['Soil Science'], is_team: false },
      { id: '14', name: 'NYIRAHABYARIMANA Alice', role: 'Member', avatar: '👩‍🌾', joined_date: '2024-04-15', sessions_attended: 5, expertise: ['Seed Selection'], is_team: false },
      { id: '15', name: 'MUTANGANA David', role: 'Member', avatar: '👨‍🌾', joined_date: '2024-04-20', sessions_attended: 4, expertise: ['Market Analysis'], is_team: false },
      { id: '16', name: 'MUKAMANA Sarah', role: 'Member', avatar: '👩‍🌾', joined_date: '2024-04-25', sessions_attended: 3, expertise: ['Food Processing'], is_team: false },
      { id: '17', name: 'NTWARI Olivier', role: 'Member', avatar: '👨‍🌾', joined_date: '2024-05-01', sessions_attended: 2, expertise: ['Livestock Management'], is_team: false },
      { id: '18', name: 'HABIMANA Grace', role: 'Member', avatar: '👩‍🌾', joined_date: '2024-05-05', sessions_attended: 1, expertise: ['Agribusiness'], is_team: false },
      { id: '19', name: 'MUKANYANDWI Jean', role: 'Member', avatar: '👨‍🌾', joined_date: '2024-05-10', sessions_attended: 1, expertise: ['Sustainable Farming'], is_team: false },
      { id: '20', name: 'NYIRAHABYARIMANA Paul', role: 'Member', avatar: '👨‍🌾', joined_date: '2024-05-15', sessions_attended: 0, expertise: ['New Member'], is_team: false },
    ]);

    setSessions([
      { id: '1', title: 'IP Rights for Farmers', date: '2024-05-20', attendees: 18, topic: 'Copyright Protection for Agricultural Content' },
      { id: '2', title: 'Smart Farming Workshop', date: '2024-05-15', attendees: 22, topic: 'IoT Integration in Small Farms' },
      { id: '3', title: 'Crop Optimization', date: '2024-05-10', attendees: 20, topic: 'Maximizing Yield with Limited Resources' },
      { id: '4', title: 'Market Access Strategies', date: '2024-05-05', attendees: 16, topic: 'Direct Marketing Techniques' },
    ]);

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in pb-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">Club Hub</h1>
              <p className="text-amber-100">Rwanda National IP Club - ARIPO Regional Competitors 2026</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{members.length}</div>
                <div className="text-xs text-amber-100">Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{sessions.length}</div>
                <div className="text-xs text-amber-100">Sessions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'members', label: 'Members', icon: Users },
            { id: 'sessions', label: 'Sessions', icon: Calendar },
            { id: 'resources', label: 'Resources', icon: BookOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-emerald-600 text-emerald-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Members Tab */}
        {activeTab === 'members' && (
          <div className="grid gap-4">
            {/* Team Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Our Team - Rwanda National IP Club Winners 2026
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {members.filter(m => m.is_team).map((member) => (
                  <div key={member.id} className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{member.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{member.name}</h4>
                          <span className="px-2 py-1 bg-emerald-600 text-white text-xs rounded-full">Team</span>
                        </div>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {member.sessions_attended} sessions
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {member.expertise.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Members */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                All Club Members
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.filter(m => !m.is_team).map((member) => (
                  <div key={member.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{member.avatar}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">
                            Joined {new Date(member.joined_date).toLocaleDateString()}
                          </span>
                          {member.sessions_attended > 0 && (
                            <span className="text-xs text-emerald-600 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              {member.sessions_attended} sessions
                            </span>
                          )}
                        </div>
                        {member.expertise.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {member.expertise.map((skill, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sessions Tab */}
        {activeTab === 'sessions' && (
          <div className="grid gap-4">
            {sessions.map((session) => (
              <div key={session.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900">{session.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{session.topic}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(session.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {session.attendees} attendees
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-emerald-600">Completed</div>
                    <div className="text-xs text-gray-500">Session held</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="grid gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                Learning Resources for IP Education
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Copyright Basics for Farmers', desc: 'Understanding how copyright protects your farming guides and content', type: 'Guide' },
                  { title: 'IP Registration Process', desc: 'Step-by-step guide to protecting your agricultural innovations', type: 'Tutorial' },
                  { title: 'ARIPO IP Resources', desc: 'Official resources from the African Regional Intellectual Property Organization', type: 'External' },
                  { title: 'Case Studies', desc: 'Real examples of IP protection in African agriculture', type: 'Examples' },
                ].map((resource, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{resource.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{resource.desc}</p>
                        <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {resource.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-semibold text-amber-900 mb-2">🏆 ARIPO Regional Competition 2026</h3>
              <p className="text-amber-800 text-sm mb-4">
                Our team is representing Rwanda at the ARIPO Regional level. Join us in promoting Intellectual Property education in agriculture!
              </p>
              <div className="flex items-center gap-2 text-amber-700 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Competing at ARIPO Regional Level</span>
              </div>
            </div>
          </div>
        )}

        <div className="text-center pt-4">
          <p className="text-xs text-gray-500">© 2026 AgriPio Team - Rwanda National IP Club</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
