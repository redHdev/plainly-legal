package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"

	"github.com/clerkinc/clerk-sdk-go/clerk"
)

func main() {
	// Create a new Clerk client with your Clerk secret key
	client, err := clerk.NewClient("sk_test_mM0xlC4IIWf388ihMgthD92SvjGx5pQ5Y0eKidp6jz")

	// Open the CSV file
	file, err := os.Open("emails.csv")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	// Read the CSV file
	reader := csv.NewReader(file)

	// Read each record from csv
	records, err := reader.ReadAll()
	if err != nil {
		log.Fatal(err)
	}

	//remove the header row
	records = records[1:]

	for _, record := range records {
		email := record[0] // assuming email is the first column in the CSV

		// Create the allowlist identifier
		params := clerk.CreateAllowlistIdentifierParams{
			Identifier: email,
			Notify:     true,
		}
		_, err := client.Allowlists().CreateIdentifier(params)
		if err != nil {
			fmt.Printf("Failed to add %s to the allowlist: %s\n", email, err)
		} else {
			fmt.Printf("Successfully added %s to the allowlist.\n", email)
		}
	}
}
