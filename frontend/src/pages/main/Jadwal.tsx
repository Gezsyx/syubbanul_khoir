import { useState, useEffect } from "react";
import CardJadwal, { type JadwalProps } from "../../components/CardJadwal";
import latar from "../../assets/1.png"; // Sesuaikan path gambarnya

export default function Jadwal() {
  const [daftarJadwal, setDaftarJadwal] = useState<JadwalProps[]>([]);

  // Simulasi pemanggilan API/Database
  useEffect(() => {
    const fetchDatabase = () => {
      const dummyData: JadwalProps[] = [
        {
          id: 1,
          acara: "Peringatan Hari Besar Islam & Gema Shalawat Akbar",
          lokasi: "Masjid Agung Kota Tegal",
          tanggal: "2026-06-09T00:00:00.000Z", // Format DateTime Prisma ketika di-JSON-kan
          waktu: "19:30 WIB - Selesai",
        },
        {
          id: 2,
          acara: "Tasyakuran Pernikahan",
          lokasi: "Gedung Yaumi, Slawi",
          tanggal: "2026-06-15T00:00:00.000Z",
          waktu: "08:00 WIB - Selesai",
        },
        {
          id: 3,
          acara: "Pengajian Rutin Malam Jumat",
          lokasi: "Masjid Sahari, Pacul",
          tanggal: "2026-06-18T00:00:00.000Z",
          waktu: "20:00 WIB - Selesai",
        },
      ];
      setDaftarJadwal(dummyData);
    };

    fetchDatabase();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white pb-20">
      
      {/* ================= HERO SECTION ================= */}
      <section 
        className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${latar})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
            Jadwal Acara Mendatang
          </h1>
          <p className="text-gray-200 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Ikuti dan hadiri syiar lantunan sholawat bersama kelompok Hadroh kami di berbagai tempat.
          </p>
        </div>
      </section>

      {/* ================= DAFTAR ACARA (GRID) ================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-16 relative z-20">
        
        <div className="min-h-125">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Semua Acara Kami</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {daftarJadwal.map((jadwal) => (
              <CardJadwal 
                key={jadwal.id}
                acara={jadwal.acara}
                lokasi={jadwal.lokasi}
                tanggal={jadwal.tanggal}
                waktu={jadwal.waktu}
              />
            ))}
          </div>

          {daftarJadwal.length === 0 && (
            <div className="w-full py-20 text-center text-gray-500">
              Belum ada jadwal acara mendatang.
            </div>
          )}
        </div>
        
      </section>

    </div>
  );
}