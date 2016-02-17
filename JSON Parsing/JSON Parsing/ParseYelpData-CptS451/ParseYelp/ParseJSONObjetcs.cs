using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Json;
using System.Text.RegularExpressions;

namespace parse_yelp
{
    
    class ParseJSONObjects
    {              
        Categories category;

        public ParseJSONObjects( )
        {
            category = new Categories();
        }
        
        public void Close( )
        {
        }

        private int maxLength = 5000;
        private string cleanTextforSQL(string inStr)
        {
            String outStr = Encoding.GetEncoding("iso-8859-1").GetString(Encoding.UTF8.GetBytes(inStr));
            outStr = outStr.Replace("\"", "").Replace("'", " ").Replace(@"\n", " ").Replace(@"\u000a", " ").Replace("\\", " ").Replace("é", "e").Replace("ê", "e").Replace("Ã¼", "A").Replace("Ã", "A").Replace("¤", "").Replace("©", "c").Replace("¶","");
            outStr = Regex.Replace(outStr,@"[^\u0020-\u007E]", "?");
            
            //Only get he first maxLength chars. Set maxLength to the max length of your attribute.
            return outStr.Substring(0, Math.Min(outStr.Length, maxLength));
        }

        
        private string TruncateReviewText(string longText)
        {
            int maxTextLength = 250;
            return longText.Substring(0, Math.Min(maxTextLength, longText.Length)) + "...";
        }


        private List<string> ProcessArray(string key, JsonArray jsonArray)
        {
            var result = new List<string>();

            result.Add(key + ":  [");

            foreach (var jsonValue in jsonArray)
            {
                if (jsonValue is JsonObject)
                {
                    var temp = ProcessObject(key, jsonValue as JsonObject);
                    result.AddRange(temp);
                }
                else if (jsonValue is JsonArray)
                {
                    var temp = ProcessArray(key, jsonValue as JsonArray);
                    result.AddRange(temp);
                }
                else if (jsonValue is JsonPrimitive)
                {
                    string temp = cleanTextforSQL((jsonValue as JsonPrimitive).ToString()) + "";
                    result.Add(temp);
                }

                result.Add(", ");
            }

            result = result.Take(result.Count -1).ToList();

            result.Add("]");

            return result;
        }

        private List<string> ProcessObject(string key, JsonObject jsonObject)
        {
            var result = new List<string>();

            result.Add( key + ":  {");

            result.Add(ProcessJson(jsonObject, null));

            result.Add("}");

            return result;
        }

        private string ProcessPrimitive(string key, JsonPrimitive jsonObject)
        {
            var text = (jsonObject.ToString().Length > 250)
                ? TruncateReviewText(cleanTextforSQL(jsonObject.ToString()))
                : cleanTextforSQL(jsonObject.ToString());

            var result = key + ":  " + text;
            return result;
        }


        private string ProcessJson(JsonObject my_jsonStr, List<string> excludesList)
        {
            var keys = my_jsonStr.Keys.ToArray();
            var values = my_jsonStr.Values.ToArray();

            var keyEnumerator = keys.GetEnumerator();
            var valueEnumerator = values.GetEnumerator();

            var result = new List<string>();

            while (keyEnumerator.MoveNext())
            {
                valueEnumerator.MoveNext();

                string key = keyEnumerator.Current as String;
                var value = valueEnumerator.Current as JsonValue;

                if (excludesList != null && excludesList.Contains(key))
                {
                    continue;
                }

                if (value is JsonObject)
                {
                    var temp = ProcessObject(key, value as JsonObject);
                    result.AddRange(temp);
                }
                else if (value is JsonArray)
                {
                    var temp = ProcessArray(key, value as JsonArray);
                    result.AddRange(temp);
                }
                else if (value is JsonPrimitive)
                {
                    result.Add(ProcessPrimitive(key, value as JsonPrimitive));
                }

                result.Add(", ");
            }

            result = result.Take(result.Count - 1).ToList();

            return string.Join("", result);
        }

        /* Extract business information*/
        public string ProcessBusiness(JsonObject my_jsonStr)
        {
            return ProcessJson(my_jsonStr, new List<string> { "hours", "neighborhoods" });
        }


        /* Extract review information*/
        public string ProcessReviews(JsonObject my_jsonStr)
        {
            return ProcessJson(my_jsonStr, null);
        }

        /* Extract review information*/
        public string ProcessUsers(JsonObject my_jsonStr)
        {
            return ProcessJson(my_jsonStr, new List<string> { "friends", "compliments", "elite" });
        }


        /* The INSERT statement for category tuples*/
        public string ProcessBusinessCategories(JsonObject my_jsonStr)
        {
            String insertString = "";
            JsonArray categories = (JsonArray)my_jsonStr["categories"];
            //append an INSERT statement to insertString for each category of the business 
            for (int i = 0; i < categories.Count; i++)
                insertString = insertString + "INSERT INTO businessCategory (business_id, category) VALUES ("
                                + "'" + my_jsonStr["business_id"].ToString().Replace("\"", "") + "' , "
                                + "'" + cleanTextforSQL(categories[i].ToString()) + "'"
                                + ");"
                                + "\n"; //append a new line
            return insertString;
        }
                               

    }
}
