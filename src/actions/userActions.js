import { 
  useAddUserMutation, 
  useGetUserQuery, 
  useGetUserByIdQuery, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} from '../api/userApi';

// Custom hook that provides user actions with Redux mutations
export const useUserActions = () => {
  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const userActions = {
    // Create user
    createUser: async (userData) => {
      try {
        const result = await addUser(userData).unwrap();
        console.log('Redux action result:', result); // Debug log
        return result;
      } catch (error) {
        console.error('Redux action error:', error); // Debug log
        throw new Error('Failed to create user');
      }
    },

    // Update user
    updateUser: async ({ id, userData }) => {
      try {
        const result = await updateUser({ id, user: userData }).unwrap();
        return result;
      } catch {
        throw new Error('Failed to update user');
      }
    },

    // Delete user
    deleteUser: async (id) => {
      try {
        const result = await deleteUser(id).unwrap();
        return result;
      } catch {
        throw new Error('Failed to delete user');
      }
    }
  };

  return {
    userActions,
    isLoading: isAdding || isUpdating || isDeleting
  };
};

// Query hooks that can be used directly in components
export const useUserQueries = () => {
  return {
    useGetUsers: useGetUserQuery,
    useGetUserById: useGetUserByIdQuery
  };
};

// Helper function to prepare user data
export const prepareUserData = (formData) => {
  return {
    id: parseInt(formData.id),
    name: formData.name.trim(),
    age: parseInt(formData.age),
    weight: parseFloat(formData.weight),
    created_at: new Date().toISOString()
  };
};

export default useUserActions;
