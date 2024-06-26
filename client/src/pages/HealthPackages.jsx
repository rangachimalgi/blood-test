import populartest01 from "../Images/test-image-01.avif";
import womenhealth from "../Images/womanhealthpackage.jpg";
import menhealth from "../Images/MaleHealthPackage.jpg"
import GenaralHealthPackage from "../Images/GenaralHealthPackage.jpg"
import FemaleAdvancePackage from "../Images/FemaleAdvancePackage.jpg"
import maleadvancepackage from "../Images/maleadvancepackage.jpg"
import FemaleSeniorCitizen from "../Images/FemaleSeniorCitizen.jpg"
import seniorcitizen from "../Images/seniorcitizen.jpg"

export const healthPackagesArray = [
    {
      id: "01",
      productName: "BASIC HEALTH PACKAGE (66 Tests)",
      type: "package",
      includedTests: [
        {
          categoryName: "Thyroid Profile",
          tests: ["01", "02"],
        },
        {
          categoryName: "Lipid Profile",
          tests: ["03", "04", "05"],
        },
        // ... more categories can be added similarly
      ],
      desc: "SJDKK KJDKD",
      imgUrl: populartest01,
      category: "Basic",
      price: 1199.0,
      discount: 30,
      shortDesc: "Sample Type: Blood",
      description:
        "Full body checkup is an essential health test that can detect hidden diseases. Reliable pathology labs like Fortune Blood Test offer a perfect solution to this challenge by providing comprehensive health packages with blood test at home services. These preventive health checkups include specific tests recommended by certified doctors and expert pathologists. It is a great way to stay on top of your health and take proactive measures to prevent any potential health issues.",
      reviews: [
        {
          rating: 4.7,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        },
      ],
      overlayTitle: "JSHJD",
      overlayDetails: [
        "Cardiac Risk Markers (5)",
        "Complete Hemogram (24)",
        "Diabetics (2)",
        "Iron (4)",
        "Lipid Profile (10)"
      ],
      avgRating: 4.5,
    },

    {
        id: "02",
        productName: "WOMEN HEALTH PACKAGE (71 Tests)",
        type: "package",
        includedTests: [
          {
            categoryName: "Thyroid Profile",
            tests: ["01", "02", "03"],
          },
          {
            categoryName: "Lipid Profile",
            tests: ["03", "04", "05", "07"],
          },
          // ... more categories can be added similarly
        ],
        imgUrl: womenhealth,
        category: "Basic",
        price: 1799.0,
        discount: 30,
        shortDesc: "Sample Type: Blood",
        description:
          "The WOMENS HEALTH PACKAGE consists of 71 types of blood tests, including Kidney, Liver, Thyroid, Iron, Lipid, Vitamin D, B12, Folic Acid, Hormones (important PCOD tests), CBC, and many more. This package is recommended for women aged between 16 to 50 years and also for those suffering from PCOD.",
        reviews: [
          {
            rating: 4.7,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
        ],
        avgRating: 4.5,
      },

      {
        id: "03",
        productName: "MALE HEALTH PACKAGE (70 Tests)",
        type: "package",
        includedTests: [
          {
            categoryName: "Thyroid Profile",
            tests: ["01", "02", "03"],
          },
          {
            categoryName: "Lipid Profile",
            tests: ["03", "04", "05", "07"],
          },
          // ... more categories can be added similarly
        ],
        imgUrl: menhealth,
        category: "Basic",
        price: 1799.0,
        discount: 30,
        shortDesc: "Sample Type: Blood",
        description:
          "The FORTUNE BLOOD TEST MALE HEALTH PACKAGE is a comprehensive health checkup package consisting of 70 fundamental tests to screen for the overall health status of men aged from 25 to 45 years. It includes tests for Lipid, Liver, Thyroid, Iron, Diabetic, Kidney, Complete Hemogram, Hormone, Vitamin D & B12.",
        reviews: [
          {
            rating: 4.7,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
        ],
        avgRating: 4.5,
      },

      {
        id: "04",
        productName: "GENERAL HEALTH PACKAGE (111)",
        type: "package",
        includedTests: [
          {
            categoryName: "Thyroid Profile",
            tests: ["01", "02", "03"],
          },
          {
            categoryName: "Lipid Profile",
            tests: ["03", "04", "05", "07"],
          },
          // ... more categories can be added similarly
        ],
        imgUrl: GenaralHealthPackage,
        category: "Basic",
        price: 2399.0,
        discount: 30,
        shortDesc: "Sample Type: Blood",
        description:
          "Introducing our General Health Package, meticulously crafted with 111 essential parameters for a comprehensive health screening. This package covers all aspects of general health, including Zinc, Copper, Magnesium, Folic Acid, Vitamin D and B12 levels, cholesterol, and other vital blood and urine tests. Ideal for individuals of any age group, it offers a holistic assessment to prioritize your well-being.",
        reviews: [
          {
            rating: 4.7,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
        ],
        avgRating: 4.5,
      },

      {
        id: "05",
        productName: "FEMALE ADVANCED HEALTH PACKAGE (108 Tests)",
        type: "package",
        includedTests: [
          {
            categoryName: "Thyroid Profile",
            tests: ["01", "02", "03"],
          },
          {
            categoryName: "Lipid Profile",
            tests: ["03", "04", "05", "07"],
          },
          // ... more categories can be added similarly
        ],
        imgUrl: FemaleAdvancePackage,
        category: "Basic",
        price: 2499.0,
        discount: 30,
        shortDesc: "Sample Type: Blood",
        description:
          "The FEMALE ADVANCED HEALTH PACKAGE includes 108 vital tests to screen the health status, such as Cardiac Risk Markers, Complete Hemogram, Diabetics, Iron, Lipid, Liver, Kidney, Thyroid, Vitamin, Pancreatic, Electrolytes, Ovarian Cancer, CEA (A Type of Tumour Marker) and Hormones. This package is recommended for women between the ages of 25 and 50 years old.",
        reviews: [
          {
            rating: 4.7,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
        ],
        avgRating: 4.5,
      },

      {
        id: "06",
        productName: "MALE ADVANCED HEALTH PACKAGE (105 Tests)",
        type: "package",
        includedTests: [
          {
            categoryName: "Thyroid Profile",
            tests: ["01", "02", "03"],
          },
          {
            categoryName: "Lipid Profile",
            tests: ["03", "04", "05", "07"],
          },
          // ... more categories can be added similarly
        ],
        imgUrl: maleadvancepackage,
        category: "Basic",
        price: 2499.0,
        discount: 30,
        shortDesc: "Sample Type: Blood",
        description:
          "The MALE ADVANCED HEALTH PACKAGE includes 105 vital tests to screen health status, such as Cardiac Risk Markers, Complete Hemogram, Diabetes, Iron, Lipid, Liver, Kidney, Thyroid, Vitamins, Pancreatic, Electrolytes, CEA (a type of Tumour Marker), Prostate Cancer (PSA), and Hormones. This package is recommended for men aged between 25 and 50 years.",
        reviews: [
          {
            rating: 4.7,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
        ],
        avgRating: 4.5,
      },

      {
        id: "07",
        productName: "FEMALE SENIOR CITIZEN HEALTH PACKAGE (108 Tests)",
        type: "package",
        includedTests: [
          {
            categoryName: "Thyroid Profile",
            tests: ["01", "02", "03"],
          },
          {
            categoryName: "Lipid Profile",
            tests: ["03", "04", "05", "07"],
          },
          // ... more categories can be added similarly
        ],
        imgUrl: FemaleSeniorCitizen,
        category: "Basic",
        price: 3499.0,
        discount: 30,
        shortDesc: "Sample Type: Blood",
        description:
          "The FEMALE SENIOR CITIZEN HEALTH PACKAGE consists of 108 fundamental tests for screening of health status, including Lipid, Liver, Kidney, Complete Hemogram, Diabetic screen, Iron, Thyroid, Electrolytes, Pancreas, Insulin, C-peptide, Homocysteine, Lp-PLA2 profiles, and CA 125 (Ovarian Cancer). This package is recommended for women aged above 45 years and for anyone suffering from high diabetes.",
        reviews: [
          {
            rating: 4.7,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
        ],
        avgRating: 4.5,
      },

      {
        id: "08",
        productName: "MALE SENIOR CITIZEN HEALTH PACKAGE (108 Tests)",
        type: "package",
        includedTests: [
          {
            categoryName: "Thyroid Profile",
            tests: ["01", "02", "03"],
          },
          {
            categoryName: "Lipid Profile",
            tests: ["03", "04", "05", "07"],
          },
          // ... more categories can be added similarly
        ],
        imgUrl: seniorcitizen,
        category: "Basic",
        price: 3499.0,
        discount: 30,
        shortDesc: "Sample Type: Blood",
        description:
          "The MALE SENIOR CITIZEN HEALTH PACKAGE consists of 108 fundamental tests for screening of health status, including Lipid, Liver, Kidney, Complete Hemogram, Diabetic screen, Iron, Thyroid, Electrolytes, Pancreas, Insulin, C-peptide, Homocysteine, Lp-PLA2 profiles, and PSA (Prostate Cancer). This package is recommended for men aged above 45 years and for anyone suffering from high diabetes.",
        reviews: [
          {
            rating: 4.7,
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          },
        ],
        avgRating: 4.5,
      },
      
  ]

  