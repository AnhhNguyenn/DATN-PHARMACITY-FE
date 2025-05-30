import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Typography,
    List,
    ListItem,
    CircularProgress,
    Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import backupRestoreService from './../../../services/backupRestoreService';
import {
    setBackupFiles,
    setError,
    setSuccessMessage,
    setLoading,
} from './../../../redux/slices/backupRestoreSlice';
import RestoreIcon from '@mui/icons-material/Restore';

const Restore = () => {
    console.log("Component Restore re-render");
    const dispatch = useDispatch();
    const { backupFiles, error, successMessage } = useSelector(
        (state) => state.backupRestore
    );
    const [loadingFile, setLoadingFile] = useState(null); // Trạng thái loading cho từng file

    useEffect(() => {
        loadBackupFiles();
    }, []);

    const loadBackupFiles = async () => {
        console.log("loadBackupFiles được gọi");
        try {
            dispatch(setLoading(true));
            const files = await backupRestoreService.getBackupFiles();
            console.log("Danh sách file từ API:", files);
            if (Array.isArray(files) && files.length > 0) {
                dispatch(setBackupFiles(files));
            } else {
                dispatch(setBackupFiles([]));
            }
        } catch (error) {
            console.error("Lỗi trong loadBackupFiles:", error);
            dispatch(setError(error.response?.data?.message || 'Có lỗi xảy ra'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleRestore = async (file) => {
        try {
            setLoadingFile(file);
            const result = await backupRestoreService.restoreDatabase(file);
            dispatch(setSuccessMessage(result.message));
            console.log("Trước khi gọi loadBackupFiles");
            loadBackupFiles();
            console.log("Sau khi gọi loadBackupFiles");
        } catch (error) {
            console.error("Error in handleRestore:", error);
            if (error.response) {
                console.error("Response Data:", error.response.data);
                // In ra chi tiết errors:
                console.error("Errors:", error.response.data.errors);
                console.error("Response Status:", error.response.status);
                console.error("Response Headers:", error.response.headers);
            }
            dispatch(setError(error.response?.data?.message || 'Có lỗi xảy ra'));
        }
    };

    useEffect(() => {
        if (successMessage || error) {
            setLoadingFile(null);
        }
    }, [successMessage, error]);

    return (
        <Box p={3}>
            <Typography variant="h4" mb={3}>
                Phục hồi dữ liệu
            </Typography>

            {error && (
                <Typography color="error" mt={2}>
                    {error}
                </Typography>
            )}

            {successMessage && (
                <Typography color="success.main" mt={2}>
                    {successMessage}
                </Typography>
            )}

            <Paper elevation={2} sx={{ mt: 3 }}>
                <List>
                    {backupFiles.length === 0 ? (
                        <ListItem>
                            <Typography color="textSecondary">
                                Không có file sao lưu
                            </Typography>
                        </ListItem>
                    ) : (
                        backupFiles.map((file) => {
                            const match = file.match(/backup_(\d{8})_(\d{6})\.bak/);
                            if (!match) return null;

                            const [_, date, time] = match;
                            const formattedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
                            const formattedTime = `${time.slice(0, 2)}:${time.slice(2, 4)}:${time.slice(4, 6)}`;

                            return (
                                <ListItem
                                    key={file}
                                    secondaryAction={
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleRestore(file)}
                                            disabled={loadingFile === file}
                                            startIcon={<RestoreIcon />}
                                            sx={{
                                                backgroundColor: loadingFile !== file ? 'primary.dark' : 'grey.400',
                                                color: loadingFile !== file ? 'white' : 'text.disabled',
                                                borderColor: loadingFile !== file ? 'primary.dark' : 'grey.400',
                                                '&:hover': {
                                                    backgroundColor: loadingFile !== file ? 'primary.main' : 'grey.300',
                                                },
                                            }}
                                        >
                                            Phục hồi
                                        </Button>


                                    }
                                >
                                    <Typography>
                                        {file} (Tạo lúc {formattedDate} {formattedTime})
                                    </Typography>
                                </ListItem>
                            );
                        })
                    )}
                </List>
            </Paper>
        </Box>
    );
};

export default Restore;
