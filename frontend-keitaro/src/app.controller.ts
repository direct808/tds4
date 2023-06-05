import { Controller, Get } from '@nestjs/common'
import * as appTranslation from './app-translation.json'
import * as appConfig from './app-config.json'

@Controller()
export class AppController {
  constructor() {}

  @Get('/admin')
  getAdmin() {
    return `
      <!doctype html>
  <html ng-app="app" ng-strict-di>
  <head>
    <title app-page-title></title>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="robots" content="noindex">
    <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png" data-type="icon" />
    <link rel="android-chrome" sizes="192x192" href="icons/android-chrome-192x192.png" data-type="icon" />
    <link rel="android-chrome" sizes="512x512" href="icons/android-chrome-512x512.png" data-type="icon" />
    <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png" data-type="icon" />
    <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png" data-type="icon" />
    <link rel="manifest" href="site.webmanifest" />
    <meta name="msapplication-TileColor" content="#da532c" />
    <meta name="theme-color" content="#ffffff" />

    <template id="icons">
      <link rel="apple-touch-icon" sizes="180x180" href="icons/apple-touch-icon.png" data-type="icon" />
      <link rel="android-chrome" sizes="192x192" href="icons/android-chrome-192x192.png" data-type="icon" />
      <link rel="android-chrome" sizes="512x512" href="icons/android-chrome-512x512.png" data-type="icon" />
      <link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png" data-type="icon" />
      <link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png" data-type="icon" />
    </template>
    <link href="assets/app.css" media="screen" rel="stylesheet" type="text/css" />
  </head>
  <body>

  <layout class="wrapper"></layout>

  <script type="application/javascript">
   var appUser = {"id":1,"login":"admin","type":"ADMIN","rules":null,"permissions":null,"state":"active","access_data":[],"key_count":0,"keyCount":0,"preferences":{"campaigns.index":"{\\"sort\\":{\\"column\\":\\"id\\",\\"order\\":\\"desc\\"},\\"limit\\":250,\\"metrics\\":[\\"profitability\\",\\"ts\\",\\"streams_count\\",\\"clicks\\",\\"conversions\\",\\"crs\\",\\"sale_revenue\\",\\"cost\\",\\"profit_confirmed\\",\\"roi_confirmed\\",\\"more\\",\\"campaign_unique_clicks\\",\\"stream_unique_clicks\\",\\"global_unique_clicks\\",\\"uc_campaign_rate\\",\\"uc_stream_rate\\",\\"uc_global_rate\\",\\"bots\\",\\"bot_share\\",\\"proxies\\",\\"empty_referrers\\",\\"leads\\",\\"sales\\",\\"rejected\\",\\"rebills\\",\\"approve\\",\\"revenue\\",\\"lead_revenue\\",\\"rejected_revenue\\",\\"profit\\",\\"cr\\",\\"crl\\",\\"roi\\",\\"epc\\",\\"epc_confirmed\\",\\"cps\\",\\"cpa\\",\\"cpc\\",\\"ecpc\\",\\"ecpm\\",\\"ecpm_confirmed\\",\\"ec\\",\\"ec_confirmed\\",\\"state\\",\\"id\\",\\"name\\",\\"group\\",\\"landing_clicked_period\\",\\"lp_views\\",\\"lp_clicks\\",\\"lp_ctr\\",\\"landing_clicked\\"]}","campaigns.report":"{\\"filters\\":[{\\"name\\":\\"campaign_id\\",\\"operator\\":\\"EQUALS\\",\\"expression\\":23}],\\"grouping\\":[\\"ip\\"],\\"user_columns\\":[],\\"metrics\\":[\\"clicks\\",\\"campaign_unique_clicks\\",\\"is_bot\\",\\"connection_type\\",\\"operator\\",\\"isp\\",\\"country_flag\\",\\"country\\",\\"region\\",\\"city\\",\\"language\\",\\"device_type\\",\\"user_agent\\",\\"os\\",\\"os_version\\",\\"browser\\",\\"browser_version\\",\\"device_model\\",\\"ip\\",\\"ip_mask1\\",\\"ip_mask2\\",\\"bots\\",\\"proxies\\",\\"conversions\\"],\\"limit\\":100,\\"resized_columns\\":{\\"campaign_unique_clicks\\":146,\\"os_icon\\":70,\\"browser_icon\\":74,\\"uc_global_rate\\":108,\\"device_model\\":139,\\"conversions\\":99}}","campaign_settings_hidden":false,"clicks.campaign_log":"{\\"filters\\":[{\\"name\\":\\"campaign_id\\",\\"operator\\":\\"EQUALS\\",\\"expression\\":19}],\\"limit\\":50,\\"user_columns\\":[\\"sub_id\\",\\"datetime\\",\\"ip\\",\\"campaign_id\\",\\"stream_id\\",\\"landing\\",\\"offer\\",\\"ts\\",\\"affiliate_network\\",\\"country_flag\\",\\"region\\",\\"city\\",\\"os_icon\\",\\"browser_icon\\",\\"connection_type\\",\\"device_type\\",\\"device_model\\",\\"is_bot\\",\\"is_unique_campaign\\"],\\"sort\\":[\\"sub_id\\",\\"desc\\"]}","clicks.log":"{\\"limit\\":50,\\"user_columns\\":[\\"sub_id\\",\\"datetime\\",\\"ip\\",\\"campaign_id\\",\\"stream_id\\",\\"landing\\",\\"offer\\",\\"ts\\",\\"affiliate_network\\",\\"country_flag\\",\\"region\\",\\"city\\",\\"os_icon\\",\\"browser_icon\\",\\"connection_type\\",\\"device_type\\",\\"device_model\\",\\"is_bot\\",\\"is_unique_campaign\\"],\\"sort\\":[\\"datetime\\",\\"desc\\"]}","conversions.log":"{\\"limit\\":50,\\"user_columns\\":[\\"sub_id\\",\\"campaign\\",\\"landing\\",\\"offer\\",\\"ts\\",\\"postback_datetime\\",\\"sale_period\\",\\"status\\",\\"original_status\\",\\"revenue\\"],\\"sort\\":[\\"postback_datetime\\",\\"desc\\"],\\"filters\\":[{\\"name\\":\\"ts_id\\",\\"operator\\":\\"EQUALS\\",\\"expression\\":3,\\"disabled\\":false,\\"$$hashKey\\":\\"object:402\\"},{\\"name\\":\\"sub_id_7\\",\\"operator\\":\\"CONTAINS\\",\\"expression\\":null,\\"disabled\\":false,\\"$$hashKey\\":\\"object:416\\"}]}","dashboard.index_chart":"{\\"clicks\\":false,\\"unique_clicks\\":false,\\"conversions\\":true,\\"campaign_unique_clicks\\":false,\\"cost\\":false,\\"sale_revenue\\":false,\\"profit_confirmed\\":false,\\"roi_confirmed\\":false}","domains.index":"{\\"columns\\":[\\"checkbox\\",\\"id\\",\\"name\\",\\"default_campaign_id\\",\\"default_campaign\\",\\"campaigns_count\\",\\"notes\\",\\"more\\",\\"group\\",\\"error_description\\",\\"error_solution\\",\\"status\\",\\"next_check_at\\",\\"features\\",\\"ssl_redirect\\",\\"is_ssl\\"],\\"filters\\":[],\\"grouping\\":[],\\"limit\\":100,\\"metrics\\":[],\\"offset\\":0,\\"sort\\":[{\\"name\\":\\"id\\",\\"order\\":\\"desc\\"}]}","language":"ru","offers.index":"{\\"limit\\":250,\\"sort\\":[\\"rejected\\",\\"desc\\"],\\"metrics\\":[\\"profitability\\",\\"notes\\",\\"country\\",\\"affiliate_network\\",\\"clicks\\",\\"leads\\",\\"sales\\",\\"rejected\\",\\"cr\\",\\"epc_confirmed\\",\\"cpc\\",\\"sale_revenue\\",\\"cost\\",\\"profit_confirmed\\",\\"roi_confirmed\\",\\"conversion_cap\\"]}","timezone":"Europe\\/Moscow","trends.index":"{\\"grouping\\":[\\"day\\"],\\"metrics\\":[\\"profitability\\",\\"clicks\\",\\"global_unique_clicks\\",\\"conversions\\",\\"revenue\\",\\"cost\\",\\"profit\\",\\"cr\\",\\"epc\\",\\"roi\\"]}","first_weekday":"1","theme":"light"}};
   var appPermissions = [];
   var appConfig = ${JSON.stringify(appConfig)}
   var appTranslation = ${JSON.stringify(appTranslation)}
  </script>

  <script type="application/javascript" src="assets/app.js"></script>
  </body>
  </html>
      `
  }
}
