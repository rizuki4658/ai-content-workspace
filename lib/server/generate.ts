import type { ContentItem, ContentStatus } from "@/lib/types/content"
import type { GenerateContentFormValues } from "@/lib/validations/contents"

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildOutput(values: GenerateContentFormValues) {
  const audienceText = values.targetAudience
    ? ` for ${values.targetAudience}`
    : ""

  const toneText = values.tone ? ` in a ${values.tone} tone` : ""

  return `# ${values.title}

Here is a generated ${values.type.replaceAll("_", " ")}${audienceText}${toneText}.

${values.prompt}

This content is designed to feel clear, relevant, and aligned with your requested direction. You can now refine, save, or publish it based on your workflow.`
}

export async function generateContent(
  values: GenerateContentFormValues
): Promise<ContentItem> {
  await wait(1800)

  // Optional: simulate random failure
  if (Math.random() < 0.15) {
    throw new Error("Failed to generate content. Please try again.");
  }

  const now = new Date().toISOString()
  const status: ContentStatus = "ready"

  return {
    "id": crypto.randomUUID(),
    "title": "Ikon dan Marc Marquez",
    "type": "blog_idea",
    "prompt": "buatkan artikel tentang kegiatan ikon dan marc marquez",
    "output": "# Ikon dan Marc Marquez: Serunya Pertemuan Dunia K-Pop dan MotoGP\n\nKalau ngomongin **ikon** dan **marcmarquez**, banyak anak muda langsung kebayang dua dunia yang beda tapi sama-sama penuh energi. Di satu sisi ada **iKON**, grup **k-pop** yang dikenal dengan lagu-lagu catchy dan penampilan panggung yang kuat. Di sisi lain ada **Marc Marquez**, pembalap **motogp** yang selalu identik dengan kecepatan, adrenalin, dan semangat juang tinggi.\n\nMenariknya, kalau dua nama ini dibahas dalam satu artikel, vibes-nya jadi unik banget. Dunia musik dan olahraga ternyata punya banyak kesamaan, terutama soal kerja keras, passion, dan fanbase yang super loyal.\n\n## iKON dan Aktivitas yang Selalu Ditunggu Fans\n\nSebagai salah satu grup **k-pop** yang punya banyak penggemar internasional, iKON selalu punya kegiatan yang bikin fans excited. Mulai dari comeback, konser, fan meeting, sampai konten eksklusif di media sosial, semuanya selalu berhasil menarik perhatian.\n\nBeberapa kegiatan iKON yang paling sering jadi sorotan:\n\n- Rilis lagu dan album baru\n- Tur konser di berbagai negara\n- Fan signing dan fan meeting\n- Konten behind the scenes\n- Aktivitas solo masing-masing member\n\nBuat anak muda pecinta **k-pop**, mengikuti aktivitas iKON itu bukan cuma soal musik. Ada rasa dekat dengan idola lewat update harian, interaksi online, dan momen-momen spesial yang dibagikan ke fans.\n\n## Marc Marquez dan Aktivitasnya di Dunia MotoGP\n\nKalau iKON punya panggung musik, maka **marcmarquez** punya lintasan balap sebagai arena utamanya. Sebagai salah satu nama besar di **motogp**, Marc Marquez dikenal dengan gaya balap agresif dan prestasi luar biasa.\n\nKegiatan Marc Marquez nggak cuma soal balapan, tapi juga mencakup banyak hal lain seperti:\n\n- Sesi latihan sebelum race\n- Kualifikasi dan persiapan balapan\n- Wawancara media dan konferensi pers\n- Aktivitas promosi dengan sponsor\n- Interaksi dengan fans di event dan media sosial\n\nBuat penggemar **motogp**, melihat perjuangan Marc Marquez di setiap musim selalu jadi hal yang seru. Apalagi ketika dia menunjukkan semangat comeback dan mental juara yang nggak gampang menyerah.\n\n## Kenapa iKON dan Marc Marquez Cocok Dibahas Bareng?\n\nSekilas memang beda dunia, tapi sebenarnya **ikon** dan **marcmarquez** punya banyak kesamaan yang relatable banget buat anak muda.\n\n### 1. Sama-sama punya karisma kuat  \nDi atas panggung maupun di lintasan, keduanya punya aura yang bikin orang sulit berpaling.\n\n### 2. Punya fanbase yang loyal  \nFans iKON dan Marc Marquez sama-sama total dalam mendukung idola mereka. Selalu update, selalu kasih semangat, dan selalu bangga dengan pencapaian mereka.\n\n### 3. Kerja keras di balik kesuksesan  \nBaik di industri **k-pop** maupun **motogp**, kesuksesan nggak datang instan. Ada latihan panjang, tekanan besar, dan perjuangan yang nggak mudah.\n\n### 4. Sama-sama inspiratif  \niKON menginspirasi lewat musik dan perjalanan karier mereka, sementara Marc Marquez memberi inspirasi lewat keberanian dan semangat pantang menyerah.\n\n## Kalau Anak K-Pop Mulai Suka MotoGP\n\nFenomena ini sebenarnya makin sering terlihat. Banyak anak muda yang awalnya cuma suka musik, mulai tertarik juga dengan dunia olahraga seperti **motogp**. Alasannya simpel: sama-sama seru, penuh emosi, dan punya idol figure yang menarik untuk diikuti.\n\nMarc Marquez punya pesona kompetitif yang bisa bikin orang penasaran, sama seperti iKON yang bikin fans jatuh cinta lewat performa mereka. Jadi nggak heran kalau topik tentang **ikon**, **marcmarquez**, **motogp**, dan **k-pop** bisa terasa nyambung banget.\n\n## Penutup\n\nPada akhirnya, iKON dan Marc Marquez membuktikan kalau passion bisa datang dari bidang apa saja. Satu dari musik, satu dari balapan, tapi keduanya sama-sama memberi hiburan, inspirasi, dan energi positif untuk para penggemarnya.\n\nBuat kamu yang cinta **k-pop** tapi juga penasaran dengan **motogp**, nggak ada salahnya mulai eksplor dua dunia ini. Siapa tahu, kamu jadi menemukan keseruan baru dari kombinasi **ikon** dan **marcmarquez** yang ternyata sama-sama keren.",
    "status": "ready",
    "favorite": false,
    "tone": "friendly",
    "targetAudience": "anak muda pecinta k-pop",
    "createdAt": "2026-04-16T13:02:03.129Z",
    "updatedAt": "2026-04-16T13:02:03.129Z"
  }
}
