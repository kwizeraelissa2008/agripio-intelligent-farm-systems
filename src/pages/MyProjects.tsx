import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/components/DashboardLayout';
import { Plus, Download, Shield, Calendar, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  created_at: string;
  status: 'active' | 'completed' | 'planning';
  ip_protected: boolean;
  progress: number;
  next_steps: string[];
}

export default function MyProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in real app, fetch from Supabase
    setProjects([
      {
        id: '1',
        title: 'Maize-Bean Intercropping System',
        description: 'Optimizing yield through companion planting techniques',
        created_at: '2024-01-15',
        status: 'active',
        ip_protected: true,
        progress: 75,
        next_steps: ['Apply organic fertilizer', 'Monitor pest activity', 'Document growth patterns']
      },
      {
        id: '2',
        title: 'Drip Irrigation Setup',
        description: 'Water-efficient irrigation for dry season farming',
        created_at: '2024-01-10',
        status: 'planning',
        ip_protected: false,
        progress: 30,
        next_steps: ['Survey land layout', 'Calculate water requirements', 'Purchase materials']
      }
    ]);
    setLoading(false);
  }, []);

  const generatePDF = (projectId: string) => {
    // Mock PDF generation with watermark
    alert('Generating PDF with copyright watermark... This would download a protected PDF in production.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-600 bg-emerald-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      case 'planning': return 'text-amber-600 bg-amber-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <TrendingUp className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'planning': return <Calendar className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
            <p className="text-gray-600 text-sm mt-1">Track your farming projects with IP protection</p>
          </div>
          <Link to="/dashboard/ai-guidance"
            className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 text-sm mb-4">Start your first farming project with AI guidance</p>
            <Link to="/dashboard/ai-guidance"
              className="bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700 transition-colors inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Project
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg text-gray-900">{project.title}</h3>
                      {project.ip_protected && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full">
                          <Shield className="w-3 h-3" />
                          IP Protected
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(project.created_at).toLocaleDateString()}
                      </span>
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status)}
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Next Steps */}
                {project.next_steps.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Next Steps:</h4>
                    <ul className="space-y-1">
                      {project.next_steps.map((step, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* IP Protection Checklist */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-medium text-amber-900">IP Protection Checklist</h4>
                      <div className="mt-2 space-y-1">
                        <label className="flex items-center gap-2 text-xs text-amber-800">
                          <input type="checkbox" defaultChecked={project.ip_protected} className="rounded text-amber-600" />
                          Document unique farming methods
                        </label>
                        <label className="flex items-center gap-2 text-xs text-amber-800">
                          <input type="checkbox" defaultChecked={project.ip_protected} className="rounded text-amber-600" />
                          Take photos/videos of process
                        </label>
                        <label className="flex items-center gap-2 text-xs text-amber-800">
                          <input type="checkbox" defaultChecked={project.ip_protected} className="rounded text-amber-600" />
                          Register copyright protection
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => generatePDF(project.id)}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Download PDF
                  </button>
                  <Link
                    to="/dashboard/ai-guidance"
                    className="flex items-center gap-2 px-3 py-1.5 text-xs bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Get AI Advice
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center pt-4">
          <p className="text-xs text-gray-500">© 2026 AgriPio Team - All projects protected by copyright</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
