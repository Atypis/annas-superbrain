const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Read the full data from JSON
const jsonPath = path.join(__dirname, '..', '..', 'vc_partners_data.json');
const fullData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log(`Loaded ${fullData.length} records from JSON`);

async function updateAllRecords() {
  for (let i = 0; i < fullData.length; i++) {
    const record = fullData[i];
    console.log(`\n[${i+1}/${fullData.length}] Updating ${record.name}...`);
    
    try {
      // Execute raw SQL update to bypass any client-side issues
      const { data, error } = await supabase.rpc('execute_sql', {
        query: `
          UPDATE vc_partners 
          SET 
            partner_reasoning = $1,
            series_reasoning = $2,
            neurotech_reasoning = $3,
            exits_reasoning = $4,
            location_reasoning = $5,
            role_reasoning = $6
          WHERE name = $7`,
        params: [
          record.partner_reasoning || null,
          record.series_reasoning || null,
          record.neurotech_reasoning || null,
          record.exits_reasoning || null,
          record.location_reasoning || null,
          record.role_reasoning || null,
          record.name
        ]
      });

      if (error) {
        // Fallback to direct update
        const { data: updateData, error: updateError } = await supabase
          .from('vc_partners')
          .update({
            partner_reasoning: record.partner_reasoning || null,
            series_reasoning: record.series_reasoning || null,
            neurotech_reasoning: record.neurotech_reasoning || null,
            exits_reasoning: record.exits_reasoning || null,
            location_reasoning: record.location_reasoning || null,
            role_reasoning: record.role_reasoning || null
          })
          .eq('name', record.name);
        
        if (updateError) {
          console.error(`❌ Error: ${updateError.message}`);
        } else {
          console.log(`✅ Updated successfully`);
          if (record.series_reasoning) {
            console.log(`   Series reasoning: ${record.series_reasoning.length} chars`);
          }
        }
      } else {
        console.log(`✅ Updated via RPC`);
      }
    } catch (err) {
      console.error(`❌ Exception: ${err.message}`);
    }
  }
  
  console.log('\n=== All updates complete ===');
}

// Run the updates
updateAllRecords().catch(console.error);