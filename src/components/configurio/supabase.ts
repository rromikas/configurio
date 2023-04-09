import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://cgyoyxveuhcdkioxzkcp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNneW95eHZldWhjZGtpb3h6a2NwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk1MjEwMzEsImV4cCI6MTk5NTA5NzAzMX0.zb55dxyRy0CbXNVh80be6x7eG2aeSwo3NddVB4FDB0U'
);
