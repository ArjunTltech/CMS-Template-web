import { EyeIcon, EyeOffIcon } from "lucide-react"; 
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { dummyUsers, getNextId, simulateApiDelay } from '../../components/data/dummyUsers';
import DeleteConfirmModal from '../../components/ui/modal/DeleteConfirmModal';
import playNotificationSound from "../../utils/playNotification";

// Enhanced Validation Schema using Yup
const userSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .matches(/^[a-zA-Z\s]+$/, 'Name can only contain letters'),
  email: yup.string()
    .required('Email is required')
    .email('Please enter a valid email')
    .max(100, 'Email must be at most 100 characters'),
  password: yup.string().when('isEditing', {
    is: false,
    then: () => yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
      .required('Password is required'),
    otherwise: () => yup.string().nullable(),
  }),
  confirmPassword: yup.string().when('password', {
    is: (val) => val && val.length > 0,
    then: () => yup.string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    otherwise: () => yup.string().nullable(),
  }),
  role: yup.string().required('Role is required'),
  isEditing: yup.boolean(),
});

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      isEditing: false
    }
  });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await simulateApiDelay(500);
      
      // Sort users alphabetically by name (case-insensitive)
      const sortedUsers = [...dummyUsers].sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
  
      setUsers(sortedUsers);
    } catch (error) {
      toast.error("Failed to load users");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (user = null) => {
    setSelectedUser(user);
    setValue('isEditing', !!user);
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        role: user.role,
        isEditing: true
      });
    } else {
      reset({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'admin', // Default role
        isEditing: false
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    reset();
  };

  const handleSubmitUser = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Simulate API delay
      await simulateApiDelay(800);
      
      if (selectedUser) {
        // Edit mode
        const { password, confirmPassword, isEditing, ...updateData } = data;
        
        // Check if email already exists for other users
        const emailExists = users.some(user => 
          user.email.toLowerCase() === updateData.email.toLowerCase() && 
          user.id !== selectedUser.id
        );
        
        if (emailExists) {
          toast.error('Email already exists');
          return;
        }
        
        const updatedUsers = users.map(user => 
          user.id === selectedUser.id 
            ? { ...user, ...updateData }
            : user
        );
        
        // Sort updated users
        const sortedUsers = updatedUsers.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        
        setUsers(sortedUsers);
        toast.success('User updated successfully');
      } else {
        // Add mode
        const { isEditing, password, confirmPassword, ...createData } = data;
        
        // Check if email already exists
        const emailExists = users.some(user => 
          user.email.toLowerCase() === createData.email.toLowerCase()
        );
        
        if (emailExists) {
          toast.error('Email already exists');
          return;
        }
        
        const newUser = {
          id: getNextId(users),
          ...createData
        };
        
        const updatedUsers = [...users, newUser];
        
        // Sort updated users
        const sortedUsers = updatedUsers.sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
        
        setUsers(sortedUsers);
        
        // Play notification sound if function exists
        if (typeof playNotificationSound === 'function') {
          playNotificationSound();
        }
        
        toast.success('User added successfully');
      }
      
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while processing the request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      
      // Simulate API delay
      await simulateApiDelay(500);
      
      const updatedUsers = users.filter(user => user.id !== userToDelete.id);
      setUsers(updatedUsers);
      
      toast.success('User deleted successfully');
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      toast.error('Failed to delete user');
    } finally {
      setIsDeleting(false);
    }
  };

  // Reusable form field component
  const FormField = ({ 
    label, 
    name, 
    register, 
    errors, 
    type = "text", 
    mandatory = false, 
    ...props 
  }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <div className="form-control mt-4 relative">
        <label className="label">
          <span className="label-text">
            {label}
            {mandatory && <span className="text-error ml-1">*</span>}
          </span>
        </label>
        <div className="relative">
          <input
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            className={`input input-bordered w-full pr-10 ${errors[name] ? "input-error" : ""}`}
            {...register(name)}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </button>
          )}
        </div>
        {errors[name] && <span className="text-error text-sm mt-1">{errors[name].message}</span>}
      </div>
    );
  };
  
  return (
    <div className="p-6 bg-base-100 rounded-lg space-y-6">
      {/* Header */}
      <div className="md:flex space-y-2 md:space-y-0 block justify-between items-center">
        <div className=' space-y-2'>
          <h1 className="text-3xl font-bold text-neutral-content">User List </h1>
          <p >Total Users : {users.length}</p>
        </div>
        <button className="btn btn-primary" onClick={() => openModal()}>
          Add User
        </button>
      </div>

      {/* User List Table */}
      <div className="overflow-x-auto mt-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <table className="table w-full text-lg">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === 'superadmin' ? 'badge-secondary' : 'badge-primary'}`}>
                        {user.role === 'superadmin' ? 'Super Admin' : 'Admin'}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-4">
                        <button
                          className="btn btn-ghost hover:bg-blue-50 p-2 rounded-lg transition-colors"
                          onClick={() => openModal(user)}
                        >
                          <FiEdit2 size={24} className="text-blue-600 hover:text-blue-700" />
                        </button>
                        <button
                          className="btn btn-ghost hover:bg-red-50 p-2 rounded-lg transition-colors"
                          onClick={() => openDeleteConfirmation(user)}
                        >
                          <FiTrash2 size={24} className="text-red-600 hover:text-red-700" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* User Form Modal */}
      <dialog id="user_modal" className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {selectedUser ? 'Edit User' : 'Add New User'}
          </h3>
          <form onSubmit={handleSubmit(handleSubmitUser)}>
            <FormField 
              label="Name" 
              name="name" 
              register={register} 
              errors={errors}
              mandatory={true}
              placeholder="Enter full name"
            />

            <FormField 
              label="Email" 
              name="email" 
              type="email"
              register={register} 
              errors={errors}
              mandatory={true}
              placeholder="Enter email address"
            />

            {!selectedUser && (
              <>
                <FormField 
                  label="Password" 
                  name="password" 
                  type="password"
                  register={register} 
                  errors={errors}
                  mandatory={true}
                  placeholder="Enter password"
                />

                <FormField 
                  label="Confirm Password" 
                  name="confirmPassword" 
                  type="password"
                  register={register} 
                  errors={errors}
                  mandatory={true}
                  placeholder="Confirm password"
                />
              </>
            )}

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">
                  Role
                  <span className="text-error ml-1">*</span>
                </span>
              </label>
              <select 
                className={`select select-bordered ${errors.role ? 'select-error' : ''}`} 
                {...register('role')}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
              {errors.role && <span className="text-error text-sm mt-1">{errors.role.message}</span>}
            </div>

            <div className="modal-action">
              <button type="button" className="btn btn-ghost" onClick={closeModal} disabled={isSubmitting}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    {selectedUser ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  <>{selectedUser ? 'Update' : 'Add'} User</>
                )}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={closeModal}>close</button>
        </form>
      </dialog>

      {/* Custom Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        message={`Are you sure you want to delete user "${userToDelete?.name}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default UserList;