/**
 * IP Daily Lessons — Short, educational IP tips shown once per day
 * Supports English + Kinyarwanda
 * © 2026 AgriPio — All rights reserved.
 */

export interface DailyIPLesson {
  id: number;
  icon: string;
  titleEn: string;
  titleRw: string;
  bodyEn: string;
  bodyRw: string;
  category: 'patent' | 'copyright' | 'trademark' | 'trade-secret' | 'general';
  durationSeconds: number; // time before user can dismiss
}

export const dailyIPLessons: DailyIPLesson[] = [
  {
    id: 1, icon: '🔒', category: 'patent', durationSeconds: 15,
    titleEn: 'Did You Know? — Patents Last 20 Years',
    titleRw: 'Wari Ubizi? — Patenti imara imyaka 20',
    bodyEn: 'A patent gives you exclusive rights to your agricultural invention for 20 years. This means no one else can make, use, or sell your innovation without your permission. If you\'ve invented a new farming tool, soil sensor, or crop treatment method — you should consider filing a patent.',
    bodyRw: 'Patenti iguha uburenganzira bwihariye ku mushinga wawe w\'ubuhinzi mu myaka 20. Nta wundi muntu ushobora gukora, gukoresha, cyangwa kugurisha igitekerezo cyawe utabibyemereye. Niba wabumbye igikoresho gishya cy\'ubuhinzi — tekereza gusaba patenti.',
  },
  {
    id: 2, icon: '©️', category: 'copyright', durationSeconds: 12,
    titleEn: 'Copyright Is Automatic!',
    titleRw: 'Uburenganzira bw\'Umwanditsi ni Bwikora!',
    bodyEn: 'The moment you create original content — a farming guide, software code, training video, or educational material — it is automatically protected by copyright. No registration is required! However, documenting your creation date helps prove ownership if disputes arise.',
    bodyRw: 'Igihe cyose ukora ibintu bishya — umwirondoro w\'ubuhinzi, kode ya porogaramu, videwo y\'amahugurwa — bihita birindwa n\'uburenganzira bw\'umwanditsi. Nta kwiyandikisha bisabwa! Ariko, kwandika itariki y\'irema bifasha kumenyesha uwabihimbye.',
  },
  {
    id: 3, icon: '™️', category: 'trademark', durationSeconds: 10,
    titleEn: 'Your Brand Name is an Asset',
    titleRw: 'Izina ry\'Ikicuruzwa Cyawe ni Umutungo',
    bodyEn: 'A registered trademark (like "AgriPio™") can be renewed indefinitely every 10 years. It protects your brand from copycats, builds customer trust, and can increase product value by up to 30%. Start by searching existing trademarks before choosing your brand name.',
    bodyRw: 'Ikimenyetso cy\'ubucuruzi cyanditswe (nka "AgriPio™") gishobora kongerwa igihe kitagira iherezo buri myaka 10. Kirinda izina ryawe, kikubaka icyizere cy\'abakiriya, kandi gishobora kongera agaciro k\'igicuruzwa kugeza kuri 30%.',
  },
  {
    id: 4, icon: '🤫', category: 'trade-secret', durationSeconds: 12,
    titleEn: 'Trade Secrets Never Expire',
    titleRw: 'Ibanga ry\'Ubucuruzi Ntirirangira',
    bodyEn: 'Unlike patents (20 years), trade secrets have NO expiration date — as long as you keep them confidential. Your special compost formula, pricing algorithm, or supplier list can be protected forever. Use NDAs (Non-Disclosure Agreements) with employees and partners.',
    bodyRw: 'Bitandukanye na patenti (imyaka 20), ibanga ry\'ubucuruzi NTIRIFITE itariki yo kurangira — niba urikomeje mu ibanga. Uburyo bwawe bwihariye bwo gukora ifumbire, algorithm y\'igiciro, cyangwa urutonde rw\'abatanga bishobora kurindwa iteka.',
  },
  {
    id: 5, icon: '🌱', category: 'general', durationSeconds: 15,
    titleEn: 'IP Increases Farm Value by 3x',
    titleRw: 'IP Yongera Agaciro k\'Ubworozi Inshuro 3',
    bodyEn: 'Studies show that agricultural businesses with registered IP (patents, trademarks, copyrights) are valued 2-3x higher by investors. Documenting your innovations, branding your products, and protecting your trade secrets makes your farm a more attractive investment.',
    bodyRw: 'Ubushakashatsi bwerekana ko ubucuruzi bw\'ubuhinzi bufite IP yanditswe (patenti, ikimenyetso, uburenganzira) bugereranywa hagati ya 2-3 inshuro z\'agaciro n\'abashoramari. Kwandika ibitekerezo byawe, gutanga izina igicuruzwa cyawe, no kurinda ibanga byawe bituma ubutaka bwawe bukurura abashoramari.',
  },
  {
    id: 6, icon: '⚖️', category: 'general', durationSeconds: 10,
    titleEn: 'Don\'t Repost Others\' Content',
    titleRw: 'Ntukongere Gukoresha Ibya Bandi',
    bodyEn: 'Sharing someone else\'s farming video, photo, or guide as your own violates copyright law. Always credit the original creator, ask for permission, or create your own original content. On AgriPio, our AI monitors media originality.',
    bodyRw: 'Gusangira videwo, ifoto, cyangwa umwirondoro w\'ubuhinzi w\'undi muntu nk\'ibyawe binyuranyije n\'amategeko y\'uburenganzira bw\'umwanditsi. Buri gihe tanga icyemezo ku wabikoreye, saba uburenganzira, cyangwa kora ibintu byawe bishya.',
  },
  {
    id: 7, icon: '📋', category: 'patent', durationSeconds: 12,
    titleEn: 'Document Your Innovations',
    titleRw: 'Andika Ibitekerezo Byawe Bishya',
    bodyEn: 'Keep an invention notebook! Write down every new idea, technique, or improvement with dates. Take photos and videos. This documentation is crucial evidence if you ever need to prove you were the original inventor of a farming innovation.',
    bodyRw: 'Bika igitabo cy\'ibitekerezo! Andika buri gitekerezo gishya, uburyo, cyangwa iterambere hamwe n\'amatariki. Fata amafoto na videwo. Izi nyandiko ni ibimenyetso by\'ingenzi niba ukeneye kugaragaza ko wari umuhimbyi wa mbere w\'igitekerezo cy\'ubuhinzi.',
  },
];

/**
 * Get the daily lesson based on the current day of the year
 * Cycles through all lessons
 */
export function getTodaysLesson(): DailyIPLesson {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  return dailyIPLessons[dayOfYear % dailyIPLessons.length];
}

/**
 * Check if the user has already seen today's lesson
 */
export function hasSeenTodaysLesson(): boolean {
  const lastSeen = localStorage.getItem('agripio_ip_lesson_date');
  const today = new Date().toDateString();
  return lastSeen === today;
}

/**
 * Mark today's lesson as seen
 */
export function markLessonSeen(): void {
  localStorage.setItem('agripio_ip_lesson_date', new Date().toDateString());
}
