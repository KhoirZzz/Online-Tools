"use client";

import Breadcrumb from "../components/Breadcrumb";
import { 
  WrenchScrewdriverIcon,
  UserGroupIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const TEAM_MEMBERS = [
  {
    name: 'John Doe',
    role: 'Frontend Developer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    description: 'Spesialis dalam pengembangan antarmuka pengguna dengan React dan Next.js.',
  },
  {
    name: 'Jane Smith',
    role: 'UI/UX Designer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    description: 'Berpengalaman dalam menciptakan desain yang intuitif dan user-friendly.',
  },
  {
    name: 'Bob Wilson',
    role: 'Backend Developer',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
    description: 'Ahli dalam pengembangan API dan manajemen database.',
  },
];

const FEATURES = [
  {
    icon: WrenchScrewdriverIcon,
    title: 'Tools',
    description: 'Berbagai alat produktivitas untuk membantu pekerjaan sehari-hari.',
  },
  {
    icon: UserGroupIcon,
    title: 'Komunitas',
    description: 'Forum diskusi dan berbagi pengetahuan antar pengguna.',
  },
  {
    icon: EnvelopeIcon,
    title: 'Dukungan',
    description: 'Bantuan teknis dan panduan penggunaan platform.',
  },
  {
    icon: GlobeAltIcon,
    title: 'Aksesibilitas',
    description: 'Platform yang dapat diakses dari berbagai perangkat.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <Breadcrumb />
          
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white font-montserrat">
              Tentang Kami
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Platform all-in-one yang menyediakan berbagai tools dan layanan untuk meningkatkan produktivitas Anda.
              Dibuat dengan passion untuk teknologi dan inovasi.
            </p>
          </div>

          {/* Features Section */}
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {FEATURES.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg"
                >
                  <div className="mx-auto w-12 h-12 flex items-center justify-center 
                    bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400"
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Tim Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TEAM_MEMBERS.map((member, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 mx-auto rounded-full bg-gray-100 dark:bg-gray-700"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {member.role}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hubungi Kami
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Punya pertanyaan atau saran? Jangan ragu untuk menghubungi kami.
            </p>
            <a
              href="mailto:contact@example.com"
              className="mt-4 inline-flex items-center px-6 py-3 border border-transparent 
                text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 
                transition-colors duration-200"
            >
              <EnvelopeIcon className="w-5 h-5 mr-2" />
              Kirim Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 