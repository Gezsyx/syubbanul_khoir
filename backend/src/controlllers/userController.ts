import { Request, Response } from "express";
import { prisma } from "../lib/db.js";
import bcrypt from "bcrypt";

// 1. MENAMPILKAN ALL USERS
export const getUser = async (req: Request, res: Response) => {
    try {
        const allUser = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc", // Menampilkan yang terbaru di atas
            },
        });

        // PERBAIKAN: Mengubah key 'user' menjadi 'data' agar sinkron dengan Frontend React
        return res.status(200).json({ 
            message: "Data berhasil ditampilkan", 
            data: allUser 
        });

    } catch (error) {
        return res.status(500).json({
            message: "Gagal mengambil data user",
            error,
        });
    }
};

// 2. MENYIMPAN DATA USER (REGISTER)
export const saveUser = async (req: Request, res: Response) => {
    try {
        const { name, username, password, foto } = req.body;
        
        // PERBAIKAN: username wajib diisi, sedangkan foto bersifat opsional (?)
        if (!name || !username || !password) {
            return res.status(400).json({
                message: "Nama, username, dan password harus diisi!",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await prisma.user.create({
            data: {
                name,
                username,
                password: hashedPassword,
                foto: foto || null, // Jika foto kosong, isi dengan null
            },
        });

        return res.status(201).json({
            message: "User berhasil dibuat",
            data: newUser
        });

    } catch (error) {
        return res.status(500).json({
            message: "Gagal membuat user",
            error,
        });
    }
};   

// 3. MENAMPILKAN DATA USER BY ID
export const showUserById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id);
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({
                message: "User tidak ditemukan",
            });
        }

        return res.json({
            message: "Detail user ditemukan",
            data: user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal mengambil detail user",
            error,
        });
    }
};

// 4. UPDATE USER BY ID
export const updateUserById = async (req: Request<{ id: string }>, res: Response) => {
   try {
        const id = Number(req.params.id);
        
        const existingUser = await prisma.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            return res.status(404).json({
                message: "User tidak ditemukan",
            });
        }

        const { name, username, password, foto } = req.body;
        
        // Jika password baru diisi, lakukan hashing. Jika tidak, biarkan undefined (Prisma akan mengabaikannya)
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                name: name ?? undefined,
                username: username ?? undefined,
                password: hashedPassword ?? undefined, // Tidak akan menimpa password lama jika kosong
                foto: foto !== undefined? foto:existingUser.foto
            },
        });

        return res.json({
            message: "User berhasil diupdate",
            data: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal update user",
            error,
        });
    }
};

// 5. MENGHAPUS USER BY ID
export const deleteUserById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const id = Number(req.params.id);

        const existingUser = await prisma.user.findUnique({
            where: { id },
        });

        if (!existingUser) {
            return res.status(404).json({
                message: "User tidak ditemukan",
            });
        }

        await prisma.user.delete({
            where: { id },
        });

        return res.json({
            message: `User dengan ID #${id} berhasil dihapus`,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal menghapus user",
            error,
        });
    }
};