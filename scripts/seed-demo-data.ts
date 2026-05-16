import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedDemoData() {
  const demoRentals = [
    {
      user_address: 'rDemoUser1',
      nft_id: 'demo_nft_1',
      status: 'completed',
      returned_on_time: true,
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_address: 'rDemoUser1',
      nft_id: 'demo_nft_2',
      status: 'completed',
      returned_on_time: true,
      created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      user_address: 'rDemoUser1',
      nft_id: 'demo_nft_3',
      status: 'completed',
      returned_on_time: true,
      created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  await supabase.from('rentals').insert(demoRentals);
  console.log('✓ Demo data seeded');
}

seedDemoData();
