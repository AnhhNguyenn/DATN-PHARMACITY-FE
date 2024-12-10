import React from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import backupRestoreService from './../../../services/backupRestoreService';
import { setError, setSuccessMessage, setLoading } from '../../../redux/slices/backupRestoreSlice';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const Backup = () => {
    const dispatch = useDispatch();
    const { loading, error, successMessage } = useSelector((state) => state.backupRestore);
    const defaultPath = "D:\\Backup"; // Đường dẫn mặc định

    const handleBackup = async () => {
        try {
            dispatch(setLoading(true));
            const result = await backupRestoreService.createBackup();
            dispatch(setSuccessMessage(result.message));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Có lỗi xảy ra'));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <Box p={3}>
            <Typography variant="h4" mb={3}>
                Sao lưu dữ liệu
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
                <Button
                    variant="contained"
                    startIcon={<SaveAltIcon />}
                    onClick={handleBackup}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Sao lưu'}
                </Button>

                <Typography variant="body2" color="textSecondary">
                    File sao lưu sẽ được lưu tại: {defaultPath}
                </Typography>
            </Box>

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
        </Box>
    );
};

export default Backup;
