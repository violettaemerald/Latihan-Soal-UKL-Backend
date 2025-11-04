Program ini merupakan sebuah program untuk rekap presensi dengan menggunakan dasar-dasar CRUD dan Middleware dari framework Node.js. 

1. Autentikasi dan otorisasi - login
<img width="1806" height="830" alt="image_2025-11-04_14-12-31" src="https://github.com/user-attachments/assets/ebdd6111-06ba-4ef2-9928-5b53ef550bec" />
    admin maupun siswa bisa mendapatkan toke untuk mengakses endpoint yang berbeda-beda sesuai dengan hak aksesnya.
    
2. Pengelolaan data pengguna
- menambah pengguna
<img width="1767" height="705" alt="image_2025-11-04_14-11-45" src="https://github.com/user-attachments/assets/a9f849c7-82dd-418d-88c5-99862e041dd9" />
  menambah profil pengguna agar pengguna bisa mengakses berbagai macam endpoint yahg berbeda. endpoint ini hanya bisa diakses oleh admin.

- mengubah data pengguna
<img width="1769" height="707" alt="image_2025-11-04_14-25-58" src="https://github.com/user-attachments/assets/2208c988-2049-4bb0-bb6b-7279c80a9add" />
  mengubah data yang sudah ada. endpoint ini hanya bisa diakses oleh siswa dan siswa hanya bisa merubah datanya sendiri.

- mengambil data pengguna / get user by id
<img width="1763" height="588" alt="image_2025-11-04_14-15-36" src="https://github.com/user-attachments/assets/aae69cf1-37e4-4612-a830-ba0b467c28d9" />
  menampilkan data pengguna sesuai dengan id pengguna, endpoint ini hanya bisa diakses oleh admin.

3. Pencatatan presensi
- menambah presensi
<img width="1753" height="729" alt="image_2025-11-04_14-30-25" src="https://github.com/user-attachments/assets/d63534d6-6d85-4f5e-adda-56d7469e0b55" />
  menambah presensi dengan menggunakan method post

- melihat history presensi
<img width="1757" height="819" alt="image_2025-11-04_14-32-01" src="https://github.com/user-attachments/assets/f37b62de-3a18-4dbf-b785-a9a067561fcc" />
  melihat semua presensi yang sudah pernah dilakukan oleh user sesuai urutan waktu

4. Analisis kehadiran
- melihat rekap kehadiran bulanan
<img width="1757" height="517" alt="image_2025-11-04_14-32-49" src="https://github.com/user-attachments/assets/83c4525f-ca27-4811-b41e-dd1f06e55c11" />
  siswa bisa melihat rekapitulasi presensi selama sebulan

- analisis kehadiran berdasarkan parameter kelas
<img width="1813" height="802" alt="image_2025-11-04_14-34-59" src="https://github.com/user-attachments/assets/7ed3c6cc-a9ca-4bb8-bf59-0de421fcda84" />
<img width="1817" height="821" alt="image_2025-11-04_14-35-42" src="https://github.com/user-attachments/assets/07f51517-39a6-4ef6-adcc-a6f450cf846a" />
  memperlihatkan rekap presensi berdasarkan kelas.


