import { supabase } from '@/lib/supabase';

export const createPoolTablesBucket = async () => {
  try {
    console.log('Checking bucket status...');
    
    const { data: buckets, error: listError } = await supabase
      .storage
      .listBuckets();

    if (listError) {
      console.error('Error listing buckets:', listError);
      return false;
    }

    const bucketExists = buckets?.some(bucket => bucket.name === 'pool-tables');
    
    if (bucketExists) {
      console.log('Bucket exists:', bucketExists);
      
      // Test bucket access
      const { data: files, error: listFilesError } = await supabase
        .storage
        .from('pool-tables')
        .list();
        
      if (listFilesError) {
        console.error('Error accessing bucket:', listFilesError);
        return false;
      }
      
      console.log('Bucket is accessible, found files:', files?.length || 0);
      return true;
    }

    console.log('Bucket not found');
    return false;
  } catch (error) {
    console.error('Detailed error:', error);
    return false;
  }
};
