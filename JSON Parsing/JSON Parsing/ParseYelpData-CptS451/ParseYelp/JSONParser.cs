/*WSU EECS CptS 451*/
/*Instructor: Sakire Arslan Ay*/

using System;
using System.IO;
using System.Json;

namespace parse_yelp
{
    class JSONParser
    {
        public void parseJSONFile(string jsonInput, string sqlOutput)
        {
            int counter;
            string line;
            StreamReader jsonfile;
            StreamWriter outputfile;

            try
            {
                ParseJSONObjects json2db = new ParseJSONObjects();
                Console.WriteLine("\nCreating: " + sqlOutput);
                Console.Write("Progress:");
                // Read the json data jsonfile.
                jsonfile = new StreamReader(jsonInput);

                // Create the output file
                outputfile = new StreamWriter(sqlOutput);
                counter = 0;

                while ((line = jsonfile.ReadLine()) != null)
                {
                    JsonObject my_jsonStr = (JsonObject) JsonObject.Parse(line);
                    string type = my_jsonStr["type"].ToString();
                    switch (type)
                    {
                        case "\"review\"":
                            outputfile.WriteLine(json2db.ProcessReviews(my_jsonStr));
                            break;
                        case "\"user\"":
                            outputfile.WriteLine(json2db.ProcessUsers(my_jsonStr));
                            break;
                        case "\"business\"":
                            outputfile.WriteLine(json2db.ProcessBusiness(my_jsonStr));
                            break;
                        default:
                            Console.WriteLine("Unknown type : " + type);
                            break;
                    }
                    if ((counter%5000) == 0)
                        Console.Write("■");
                    counter++;
                }
                jsonfile.Close();
                outputfile.Close();

            }
            catch (Exception e)
            {
                Console.Write("Exception:");
                Console.WriteLine(e.Message);
            }
            // Suspend the screen.
            Console.WriteLine("\n" + sqlOutput + ": created. \n\n Press a key to continue.");
            Console.ReadLine();

        }

    }

}
