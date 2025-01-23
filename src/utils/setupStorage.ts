import { supabase } from '@/lib/supabase';

export const createPoolTablesBucket = async () => {
  try {
    console.log('Checking bucket status...');
    
    // Check if bucket exists and is accessible
    const { data: bucket, error: getBucketError } = await supabase
      .storage
      .getBucket('pool-tables');

    if (getBucketError) {
      console.error('Error accessing bucket:', getBucketError);
      return false;
    }

    if (bucket) {
      console.log('Bucket exists and is accessible:', bucket);
      return true;
    }

    console.log('Bucket not found or not accessible');
    return false;
  } catch (error) {
    console.error('Detailed error:', error);
    return false;
  }
};