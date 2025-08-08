const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Read the full data from JSON
const jsonPath = path.join(__dirname, '..', '..', 'vc_partners_data.json');
const fullData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log(`Loaded ${fullData.length} records from JSON`);

async function updateReasoningFields() {
  let successCount = 0;
  let errorCount = 0;

  for (const record of fullData) {
    try {
      // Update each record with full reasoning text
      // Match by name only since company names might have slight differences
      const { data, error } = await supabase
        .from('vc_partners')
        .update({
          partner_reasoning: record.partner_reasoning || null,
          series_reasoning: record.series_reasoning || null,
          neurotech_reasoning: record.neurotech_reasoning || null,
          exits_reasoning: record.exits_reasoning || null,
          location_reasoning: record.location_reasoning || null,
          role_reasoning: record.role_reasoning || null
        })
        .eq('name', record.name)
        .select();

      if (error) {
        console.error(`❌ Error updating ${record.name}:`, error.message);
        console.log('Error details:', error);
        errorCount++;
      } else if (data && data.length > 0) {
        console.log(`✅ Updated ${record.name} - ${record.company}`);
        
        // Log the length of reasoning fields to verify they're full text
        if (record.series_reasoning) {
          console.log(`   Series reasoning: ${record.series_reasoning.length} chars`);
        }
        successCount++;
      } else {
        console.log(`⚠️  No match found for ${record.name} - ${record.company}`);
        console.log('Query returned:', data);
        errorCount++;
      }
    } catch (err) {
      console.error(`❌ Exception updating ${record.name}:`, err.message);
      errorCount++;
    }
  }

  console.log('\n=== Update Complete ===');
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
}

// Run the update
updateReasoningFields().catch(console.error);