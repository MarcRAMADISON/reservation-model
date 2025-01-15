"use client";

import styles from "./page.module.css";
import DatePicker from "./components/datePicker/page";
import TimePicker from "./components/timePicker/page";
import { useState } from "react";
import moment from "moment";

export default function Home() {
  const [values, setValues] = useState({
    nbPlace: 0,
    time: "",
    name: "",
    firstname: "",
    email: "",
    phone: "",
  });
  const [selected, setSelected] = useState(moment().format());
  const [currentStep, setCurrentStep] = useState("DETAIL");
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkValidation =
    values.nbPlace && values.time && moment(selected).format("DD/MM/YYYY");
  const checkInfo =
    values.name && values.firstname && values.email && values.phone && !loading;

  const handleChangeStep = (e, type) => {
    e.preventDefault();
    if (type === "NEXT") {
      setCurrentStep("INFO");
    } else if (type === "PREVIEW") {
      setCurrentStep("DETAIL");
    }
  };

  const handleReservation = (e) => {
    e.preventDefault();
    /*setLoading(true)
    emailjs.init("k5NiLn_9ogRXrP_q1");

    emailjs
      .send("service_gda3o3r", "template_usxi8yu", {
        ...values,
        date: moment(selected).format("DD/MM/YYYY"),
      })
      .then(
        (response) => {
          setLoading(false)
          setShowMessage(true)
        },
        (error) => {
          setLoading(false)
        }
      );*/

      setLoading(true)

    const emailData = {
      to: "developpeurweb.mzocompany@gmail.com", //email de l'administrateur du site
      subject: "Nouvelle réservation",
      html: `
          <p style="color:#000;font-weight:bold;font-size:1.2rem">Nouvelle réservation depuis le site web</p>

          <p style="color:#000;">Nom: <strong>${values.name}</strong></p>

          <p style="color:#000;">Prénom: <strong>${values.firstname}</strong></p>

          <p style="color:#000;">Email: <strong>${values.email}</strong></p>

          <p style="color:#000;">Numéro téléphone: <strong>${values.phone}</strong></p>

          <p style="color:#000;">Date de réservation : <strong>${moment(selected).format("DD/MM/YYYY")}</strong></p>

          <p style="color:#000;">Heure de réservation : <strong>${values.time}</strong></p>

          <p style="color:#000;">Nombre de personne : <strong>${values.nbPlace}</strong></p>
          <a href="${process.env.NEXT_PUBLIC_URL}/api/sendSecondMail?email=${
            values.email
          }&type=valider"  style="text-decoration: none;" >
            <button style="
              background-color: #007bff; 
              color: white; 
              border: 2px solid #007bff; 
              padding: 10px 20px; 
              border-radius: 5px; 
              font-size: 16px; 
              cursor: pointer; 
              transition: background-color 0.3s, border-color 0.3s;"
              onmouseover="this.style.backgroundColor='#0056b3'; this.style.borderColor='#0056b3';"
              onmouseout="this.style.backgroundColor='#007bff'; this.style.borderColor='#007bff';"
              onmousedown="this.style.backgroundColor='#004085'; this.style.borderColor='#004085';"
              onmouseup="this.style.backgroundColor='#0056b3'; this.style.borderColor='#0056b3';"
            class="styled-button">Valider la réservation</button>
          </a>
          <a 
            href="${process.env.NEXT_PUBLIC_URL}/api/sendSecondMail?email=${values.email}&type=refuser" 
            style="text-decoration: none;"
          >
            <button 
              style="
                background-color: #dc3545; 
                color: white; 
                border: 2px solid #dc3545; 
                padding: 10px 20px; 
                border-radius: 5px; 
                font-size: 16px; 
                cursor: pointer; 
                transition: background-color 0.3s, border-color 0.3s;"
                onmouseover="this.style.backgroundColor='#c82333'; this.style.borderColor='#c82333';"
                onmouseout="this.style.backgroundColor='#dc3545'; this.style.borderColor='#dc3545';"
                onmousedown="this.style.backgroundColor='#bd2130'; this.style.borderColor='#bd2130';"
                onmouseup="this.style.backgroundColor='#c82333'; this.style.borderColor='#c82333';"
            >
              Refuser la réservation
            </button>
          </a>
        `,
    };

    const response = fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setShowMessage(true)
          setLoading(false)
        } else {
          setLoading(false)
        }
      });
  };

  return currentStep === "DETAIL" ? (
    <div className={styles.page}>
      {checkValidation ? (
        <h5 className={styles.resume}>
          Réservation de {values.nbPlace} place(s), le{" "}
          {moment(selected).format("DD/MM/YYYY")}, à {values.time} .{" "}
        </h5>
      ) : (
        <></>
      )}
      <div className={styles.inputBlock}>
        <DatePicker selected={selected} setSelected={setSelected} />
        <div className={styles.block}>
          <TimePicker values={values} handleChange={handleChange} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "50px",
            }}
          >
            <label
              className={styles.labelNbPalce}
              htmlFor="nbPlace"
              onChange={handleChange}
            >
              Nombre de personne :
            </label>
            <input
              className={styles.inputPlace}
              min={0}
              type="number"
              id="nbPlace"
              name="nbPlace"
              value={values.nbPlace}
              onChange={handleChange}
            />

            <button
              disabled={!checkValidation}
              className={!checkValidation ? styles.disabled : styles.nextButton}
              onClick={(e) => {
                handleChangeStep(e, "NEXT");
              }}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.page}>
      {showMessage && <h3 className={styles.success}>Réservation envoyée</h3>}

      <div className={styles.pageInfo}>
        <div className={styles.inputLine}>
          <label
            className={styles.labelNbPalce}
            htmlFor="name"
            onChange={handleChange}
          >
            Nom :
          </label>
          <input
            className={styles.inputPlace}
            min={0}
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputLine}>
          <label
            className={styles.labelNbPalce}
            htmlFor="firstname"
            onChange={handleChange}
          >
            Prénom :
          </label>
          <input
            className={styles.inputPlace}
            min={0}
            id="firstname"
            name="firstname"
            value={values.firstname}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputLine}>
          <label
            className={styles.labelNbPalce}
            htmlFor="email"
            onChange={handleChange}
          >
            Adresse e-mail :
          </label>
          <input
            className={styles.inputPlace}
            min={0}
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputLine}>
          <label
            className={styles.labelNbPalce}
            htmlFor="phone"
            onChange={handleChange}
          >
            Téléphone :
          </label>
          <input
            className={styles.inputPlace}
            min={0}
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
          />
        </div>
        <button
          disabled={!checkValidation}
          className={styles.nextButton}
          onClick={(e) => {
            handleChangeStep(e, "PREVIEW");
          }}
        >
          Précedent
        </button>
        <button
          disabled={!checkInfo}
          className={!checkInfo ? styles.disabled : styles.nextButton}
          onClick={handleReservation}
        >
          Réserver
        </button>
      </div>
    </div>
  );
}
