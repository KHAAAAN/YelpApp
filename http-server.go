package main

import (
	"net/http"
	"fmt"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"bytes"
	"strings"
	"reflect"
	"strconv"
)

func handler(w http.ResponseWriter, r *http.Request){
	http.ServeFile(w, r, r.URL.Path[1:])
	fmt.Println(r.URL.Path[1:])
}

func refreshHandler(w http.ResponseWriter, r*http.Request){
	http.ServeFile(w, r, "index.html")
	fmt.Println("browser refresh.")
}

func statesHandler(w http.ResponseWriter, r *http.Request, db *sql.DB){
	fmt.Println("GET request to states has been acknowledged");
	rows, err := db.Query("SELECT DISTINCT state FROM CensusData ORDER BY state")
	
	if err != nil {
		log.Fatal(err)
	}

	defer rows.Close()

	var data string;
	var buffer bytes.Buffer

	buffer.WriteString("{\"data\" : [")

	for rows.Next() {
		if err := rows.Scan(&data); err != nil {
			log.Fatal(err)
		}

		buffer.WriteString("\"")
		buffer.WriteString(data)
		buffer.WriteString("\"")

		buffer.WriteString(",")
	}
	data = buffer.String()
	data = strings.TrimRight(data, ",")

	data += "]}"


	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, data)

}

func citiesHandler(w http.ResponseWriter, r *http.Request, db *sql.DB){
	fmt.Println("GET request to cities has been acknowledged")

	m := r.URL.Query()
	state := m["state"][0]

	rows, err := db.Query("SELECT DISTINCT city FROM CensusData WHERE state=? ORDER BY CITY", state);
	if err != nil{
		log.Fatal(err)
	}
	defer rows.Close()

	var data string;
	var buffer bytes.Buffer

	buffer.WriteString("{\"data\" : [")

	for rows.Next() {
		if err := rows.Scan(&data); err != nil {
			log.Fatal(err)
		}

		buffer.WriteString("\"")
		buffer.WriteString(data)
		buffer.WriteString("\"")

		buffer.WriteString(",")
	}
	data = buffer.String()
	data = strings.TrimRight(data, ",")

	data += "]}"


	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, data)
}

func zipcodesHandler(w http.ResponseWriter, r *http.Request, db *sql.DB){
	fmt.Println("GET request to zipcodes has been acknowledged")

	m := r.URL.Query()
	state, city := m["state"][0], m["city"][0]

	rows, err := db.Query("SELECT zipcode FROM CensusData WHERE state=? AND city=? ORDER BY zipcode", state, city);

	if err != nil{
		log.Fatal(err)
	}
	defer rows.Close()

	var data string;
	var buffer bytes.Buffer

	buffer.WriteString("{\"data\" : [")

	for rows.Next() {
		if err := rows.Scan(&data); err != nil {
			log.Fatal(err)
		}

		buffer.WriteString("\"")
		buffer.WriteString(data)
		buffer.WriteString("\"")

		buffer.WriteString(",")
	}
	data = buffer.String()
	data = strings.TrimRight(data, ",")

	data += "]}"


	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, data)
}

type Demographic struct{
	population string
	avg_income float64
	ageUnder18 string
	age18_to_24 string
	age25_to_44 string
	age45_to_64 string
	age65_and_over string
	median_age float64
}

func demographicsHandler(w http.ResponseWriter, r *http.Request, db *sql.DB){
	fmt.Println("GET request to demographics has been acknowledged")

	m := r.URL.Query()
	zipcode := m["zipcode"][0]

	rows, err := db.Query("SELECT population,avg_income,under18years,18_to_24years,25_to_44years,45_to_64years,65_and_over,median_age FROM CensusData WHERE zipcode=?", zipcode)

	if err != nil{
		log.Fatal(err)
	}
	defer rows.Close()

	var data string;
	var buffer bytes.Buffer

	demographic := new(Demographic)
	for rows.Next() {
		if err := rows.Scan(&demographic.population, &demographic.avg_income, &demographic.ageUnder18,
				&demographic.age18_to_24,&demographic.age25_to_44, &demographic.age45_to_64,
				&demographic.age65_and_over,
				&demographic.median_age); err != nil {
			log.Fatal(err)
		}
	}

	s := []string{"population", "avg_income", "ageUnder18", "age18_to_24", "age25_to_44", "age45_to_64", "age65_and_over",
		"median_age"}

	buffer.WriteString("{\"data\" : {")

	for i := 0; i < len(s); i++{
		ref := reflect.ValueOf(demographic)
		field := reflect.Indirect(ref).FieldByName(s[i])

		if s[i] == "avg_income" || s[i] == "median_age"{
			v := field.Float()
			str := strconv.FormatFloat(v, 'f', -1, 64)
			buffer.WriteString("\"" + s[i] + "\"" + ":" + "\"" + str + "\"")
		} else{
			v := field.String()
			buffer.WriteString("\"" + s[i] + "\"" + ":" + "\"" + v + "\"")
		}



		if i != len(s) - 1{
			buffer.WriteString(",")
		}

	}


	data = buffer.String()
	data += "}}"

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, data)
}

func main() {
	// Create the databse handle, confirm driver is present
	db, _ := sql.Open("mysql", "user:pass@/Milestone1DB")
	defer db.Close()

	// Connect and check the server version
	var version string
	db.QueryRow("SELECT VERSION()").Scan(&version)
	fmt.Println("Successfully connected to:", version)

	http.HandleFunc("/", handler)

	http.HandleFunc("/states", func(w http.ResponseWriter, r *http.Request){
		statesHandler(w, r, db);
	})

	http.HandleFunc("/cities", func(w http.ResponseWriter, r *http.Request){
		citiesHandler(w, r, db);
	})

	http.HandleFunc("/zipcodes", func(w http.ResponseWriter, r *http.Request){
		zipcodesHandler(w, r, db);
	})

	http.HandleFunc("/demographics", func(w http.ResponseWriter, r *http.Request){
		demographicsHandler(w, r, db);
	})

	//handle refresh requests
	http.HandleFunc("/business_demographics", refreshHandler)

	fmt.Println("Listening on 3000")
	http.ListenAndServe(":3000", nil)
}
