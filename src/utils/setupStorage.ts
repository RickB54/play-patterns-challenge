import { supabase } from '@/lib/supabase';

export const createPoolTablesBucket = async () => {
  try {
    const { data, error } = await supabase.storage.createBucket('pool-tables', {
      public: true,
      fileSizeLimit: 5242880, // 5MB limit per file
    });

    if (error) {
      console.error('Error creating bucket:', error.message);
      return false;
    }

    console.log('Bucket created successfully:', data);
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};