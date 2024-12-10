import requestApi from "../utils/requestApi";

// Tạo object service
const backupRestoreService = {
    // Lấy danh sách file backup
    getBackupFiles: async () => {
        try {
            const response = await requestApi({
                url: "BackUp/list",
                method: "get",
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Restore database
    restoreDatabase: async (fileName) => {
        try {
            const response = await requestApi({
                url: "BackUp/restore",
                method: "post",
                data: JSON.stringify({ fileName }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Tạo backup mới
    createBackup: async () => {
        try {
            const response = await requestApi({
                url: "BackUp/backup",
                method: "post",
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default backupRestoreService;
