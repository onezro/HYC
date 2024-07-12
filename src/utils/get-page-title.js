import defaultSettings from '@/settings'
import { translate as $t } from "@/i18n/index.js"  
const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle) {
  // console.log($t(pageTitle));
  if (pageTitle) {
    return `${$t(pageTitle)} - ${$t(title)}`
  }
  return `${$t(title)}`
}
