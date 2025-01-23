import { supabase } from '@/lib/supabase';

export const createPoolTablesBucket = async () => {
  try {
    // First check if bucket exists
    const { data: existingBucket, error: checkError } = await supabase
      .storage
      .getBucket('pool-tables');

    if (existingBucket) {
      console.log('Bucket already exists:', existingBucket);
      return true;
    }

    if (checkError) {
      console.log('Error checking bucket:', checkError);
    }

    // Create bucket if it doesn't exist
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