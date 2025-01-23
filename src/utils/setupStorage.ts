import { supabase } from '@/lib/supabase';

export const createPoolTablesBucket = async () => {
  try {
    console.log('Starting bucket creation process...');
    
    // First check if we can connect to Supabase
    const { data: testConnection, error: connectionError } = await supabase
      .from('_dummy_query_for_connection_test')
      .select('*')
      .limit(1);
      
    if (connectionError && connectionError.message.includes('authentication')) {
      console.error('Supabase authentication error:', connectionError);
      throw new Error('Failed to authenticate with Supabase');
    }

    // Check if bucket already exists
    const { data: existingBucket, error: getBucketError } = await supabase
      .storage
      .getBucket('pool-tables');

    if (existingBucket) {
      console.log('Bucket already exists:', existingBucket);
      return true;
    }

    if (getBucketError && !getBucketError.message.includes('not found')) {
      console.error('Error checking bucket:', getBucketError);
      throw getBucketError;
    }

    // Create new bucket
    const { data, error } = await supabase.storage.createBucket('pool-tables', {
      public: true,
      fileSizeLimit: 5242880, // 5MB limit per file
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg']
    });

    if (error) {
      console.error('Error creating bucket:', error);
      throw error;
    }

    console.log('Bucket created successfully:', data);
    return true;
  } catch (error) {
    console.error('Detailed error:', error);
    return false;
  }
};