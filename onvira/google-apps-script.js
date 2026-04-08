/**
 * GOOGLE APPS SCRIPT CODE
 * 
 * Instructions to set up:
 * 1. Create a new Google Sheet at https://sheets.google.com
 * 2. Name it "Onvira Contact Form Submissions" (or any name you prefer)
 * 3. Add these headers in row 1:
 *    Timestamp | Name | Email | Phone | Service | Message
 * 4. Go to Extensions → Apps Script
 * 5. Delete the default function and paste this entire code
 * 6. Click Save (disk icon)
 * 7. Click Deploy → New deployment
 * 8. Type: Web app
 * 9. Execute as: Me
 *10. Who has access: Anyone
 *11. Click Deploy, then authorize the permissions
 *12. Copy the Web App URL
 *13. Paste it in script.js (replace the old URL)
 */

const SHEET_NAME = 'Sheet1';

function doPost(e) {
  try {
    // Get data from URL-encoded parameters (e.parameter) or POST body
    const params = e.parameter || {};
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // If headers don't exist, add them
    if (sheet.getRange(1, 1).getValue() === '') {
      const headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Service', 'Message'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
    
    // Prepare the row data from URL-encoded parameters
    const rowData = [
      params.timestamp || new Date().toISOString(),
      params.name || '',
      params.email || '',
      params.phone || '',
      params.service || '',
      params.message || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success', message: 'API is working' }))
    .setMimeType(ContentService.MimeType.JSON);
}
