import { supabase } from '@/lib/supabase';

export const createPoolTablesBucket = async () => {
  try {
    // First, list all buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return false;
    }

    // Delete all existing buckets
    if (buckets && buckets.length > 0) {
      console.log('Found existing buckets:', buckets.map(b => b.name));
      
      for (const bucket of buckets) {
        const { error: deleteError } = await supabase.storage.deleteBucket(bucket.name);
        if (deleteError) {
          console.error(`Error deleting bucket ${bucket.name}:`, deleteError);
        } else {
          console.log(`Successfully deleted bucket: ${bucket.name}`);
        }
      }
    }

    // Create new bucket
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