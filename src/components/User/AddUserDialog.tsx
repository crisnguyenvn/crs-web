import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import { useContext } from "react";
import * as Yup from "yup";
import { UserContext } from "../../contexts/UserContext";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from "../../contexts/GlobalContext";
import { UserService } from "../../services/user/userService";
import { CustomError } from "../../utils/customError";
import { User } from "../../models/User";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import { Role } from "../../models/Role";

const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
        .required("Phone is required")
        .matches(/^\d{10}$/, "Phone number should be 10 digits"),
    role: Yup.array()
        .min(1, "Select at least one role")
        .required("Role is required"),
});

export default function AddUserDialog() {
    const userService = new UserService();
    const { updateLoading, updateNotification } = useContext(GlobalContext);
    const {
        roles,
        isShowAddUserDialog,
        updateIsShowAddUserDialog,
        updateIsCompletedAddUser,
    } = useContext(UserContext);

    const {
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: {
        username: string;
        password: string;
        confirmPassword: string;
        firstname: string;
        lastname: string;
        email: string;
        address: string;
        phone: string;
        role: number[];
    }): Promise<void> => {
        try {
            updateLoading(true);
            const user: User = {
                userId: 0,
                username: data.username,
                password: data.password,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                address: data.address,
                phone: data.phone,
                roles: data.role,
            };
            await userService.addUser(user);
            updateLoading(false);
            updateIsShowAddUserDialog(false);
            updateIsCompletedAddUser(true);
            updateNotification({
                status: "success",
                message: "Create user successfully",
            });
        } catch (error) {
            updateLoading(false);
            updateNotification({
                status: "error",
                message:
                    error instanceof CustomError
                        ? error.message
                        : "Unknow message",
            });
        }
    };

    const handleClose = () => {
        reset();
        updateIsShowAddUserDialog(false);
    };

    return (
        <>
            <Dialog
                open={isShowAddUserDialog}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: handleSubmit(onSubmit),
                    noValidate: true,
                    autoComplete: "off",
                }}
                sx={{
                    "& .MuiTextField-root": {
                        mt: 1,
                        mb: 1,
                        width: "100%",
                    },
                    mt: 10,
                    maxHeight: 600,
                }}
            >
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <div>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="Username"
                                    placeholder="Enter your username"
                                    error={errors.username ? true : false}
                                    helperText={errors.username?.message}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    placeholder="Enter your password"
                                    error={errors.password ? true : false}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Enter your confirm password"
                                    error={
                                        errors.confirmPassword ? true : false
                                    }
                                    helperText={errors.confirmPassword?.message}
                                />
                            )}
                        />
                        <Controller
                            name="firstname"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="First Name"
                                    placeholder="Enter your firstname"
                                    error={errors.firstname ? true : false}
                                    helperText={errors.firstname?.message}
                                />
                            )}
                        />
                        <Controller
                            name="lastname"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="Last Name"
                                    placeholder="Enter your lastname"
                                    error={errors.lastname ? true : false}
                                    helperText={errors.lastname?.message}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="Email"
                                    placeholder="Enter your email"
                                    error={errors.email ? true : false}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="address"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="Address"
                                    placeholder="Enter your address"
                                    error={errors.address ? true : false}
                                    helperText={errors.address?.message}
                                />
                            )}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="Phone"
                                    placeholder="Enter your phone number"
                                    error={errors.phone ? true : false}
                                    helperText={errors.phone?.message}
                                />
                            )}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel
                                id="role-label"
                                className={errors.role ? "Mui-error" : ""}
                            >
                                Select Roles
                            </InputLabel>
                            <Controller
                                name="role"
                                control={control}
                                defaultValue={[] as number[]}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        labelId="role-label"
                                        input={
                                            <OutlinedInput
                                                label="Select Roles"
                                                className={
                                                    errors.role
                                                        ? "Mui-error"
                                                        : ""
                                                }
                                            />
                                        }
                                        multiple
                                        renderValue={(selected: number[]) => {
                                            let selectedRoleDescription: string[] =
                                                [];
                                            selected.forEach((s) => {
                                                const selectedRole:
                                                    | Role
                                                    | undefined = roles.find(
                                                    (r) => r.roleId === s
                                                );
                                                if (selectedRole) {
                                                    selectedRoleDescription.push(
                                                        selectedRole.description
                                                    );
                                                }
                                            });
                                            return selectedRoleDescription.join(
                                                ", "
                                            );
                                        }}
                                        error={errors.role ? true : false}
                                    >
                                        {roles.map((item) => (
                                            <MenuItem
                                                key={item.roleId}
                                                value={item.roleId}
                                            >
                                                <ListItemText
                                                    primary={item.description}
                                                />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.role && (
                                <FormHelperText
                                    className={errors.role ? "Mui-error" : ""}
                                >
                                    {errors.role.message}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SendIcon />}
                    >
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
