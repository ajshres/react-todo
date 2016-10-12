/**
 * [formatText : changes string urls to hyperlink urls]
 * @param  {[String]} text [text to be converted]
 * @return {[String]}      [Converted string]
 */
export function formatText(text) {
	/* @todo: change the regex for covering all types of urls*/
	if( typeof text === 'string' && text ){
		var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    	return text.replace(exp,"<a href='$1'>$1</a>"); 
	} else {
		return text;
	}
}
