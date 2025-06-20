import {createClient} from '@supabase/supabase-js';

export const supabase = createClient(
    'https://tnlbllqktkzdpzmdusls.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRubGJsbHFrdGt6ZHB6bWR1c2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODA1MjIsImV4cCI6MjA2MTc1NjUyMn0.YPTbUiN_TbF_PrhgDhgGs7Lr9fzERRnyrTjy-J8nBlY'
);
