/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

import { createUser } from "../../services/api";
import { Link, Navigate } from "react-router-dom";

import FotoCadastro from "./assets/fotocadastro.svg";
import addIcon from "./assets/add-icon.svg";

import NavLogin from "../../components/NavLogin";
import RegisterModal from "../../components/RegisterModal";

import "./style.css";

const Register = ({ users, setUsers }) => {
  const [userName, setUserName] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userLevel, setUserLevel] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [knowledges, setknowledges] = useState([]);
  const [newKnowledgeName, setNewKnowledgeName] = useState("");

  const [error, setError] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const inputKnowledges = useRef();
  const addKnowledgeButton = useRef();
  const subitButton = useRef();

  const [status, setStatus] = useState({
    type: "",
    msg: "",
  });

  useEffect(() => {
    setStatus("");
  }, [userName, userEmail, userLevel, userPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const user = {
      name: userName,
      email: userEmail,
      level: userLevel,
      password: userPassword,
      knowledges: knowledges,
    };

    const data = Object.assign(user);
    console.log(data);

    try {
      const response = await createUser(data);

      setUsers((oldState) => [...oldState, response]);

      console.log(response);
    } catch (err) {
      console.error(err);

      return setError(true);
    }
  };

  const windowReload = (e) => {
    if (e) {
      window.location.reload();
    }
  };

  if (error) {
    return (
      <div className="loading">
        <p className="loading-text">Erro ao se registrar. </p>
        <p className="loading-text">
          <Link to="/register">
            <span
              className="loading-text"
              id="span-error-register"
              onClick={windowReload}
            >
              Clique aqui
            </span>
          </Link>
        </p>
        <p className="loading-text">para recarregar a página.</p>
      </div>
    );
  }

  const validate = () => {
    if (!userName.trim())
      return setStatus({ type: "name", msg: "O nome é obrigatório." });

    if (!userLevel.trim())
      return setStatus({ type: "level", msg: "O cargo é obrigatório." });

    if (!userEmail.trim()) {
      return setStatus({ type: "email", msg: "O email é obrigatório." });
    }

    if (!userPassword.trim()) {
      return setStatus({ type: "password", msg: "A senha é obrigatória." });
    }

    return true;
  };

  const handleAddNewKnowledge = () => {
    if (!newKnowledgeName) return;

    const newKnowledge = {
      id: uuidv4(),
      name: newKnowledgeName,
    };

    setknowledges((oldState) => [...oldState, newKnowledge]);
    setNewKnowledgeName("");
  };

  const handleRemoveKnowledge = (id) => {
    const knowledgeRemoved = knowledges.filter(
      (knowledge) => knowledge.id !== id
    );

    setknowledges(knowledgeRemoved);
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  if (
    userName !== "" &&
    userEmail !== "" &&
    userPassword !== "" &&
    userLevel !== ""
  ) {
    subitButton.current.removeAttribute("disabled");
  }

  return (
    <div>
      <NavLogin />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onRequestClose={handleCloseRegisterModal}
      />
      <div>
        <h2 className="register-title">
          bem-vindo ao <br />
          <span> Technical Share</span>
        </h2>
      </div>
      <div className="register-container">
        <div>
          <img src={FotoCadastro} alt="foto Cadastrar" />
        </div>
        <div className="register-content">
          <h1>Cadastro</h1>
          <p>Cadastrar sua conta</p>
          <form onSubmit={handleSubmit}>
            <div className="register-field">
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              {status.type === "name" ? <span>{status.msg}</span> : ""}
            </div>
            <div className="register-field">
              <label htmlFor="level">Cargo:</label>
              <input
                type="text"
                id="level"
                value={userLevel}
                onChange={(e) => setUserLevel(e.target.value)}
              />
              {status.type === "level" ? <span>{status.msg}</span> : ""}
            </div>
            <div className="register-field">
              <label htmlFor="email">Seu e-mail do Teams:</label>
              <input
                type="email"
                id="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              {status.type === "email" ? <span>{status.msg}</span> : ""}
            </div>
            <div className="register-field">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
              {status.type === "password" ? <span>{status.msg}</span> : ""}
            </div>
            <div className="register-field">
              <label htmlFor="knowledges">Habilidades</label>
              <div className="register-field-addIcon">
                <input
                  type="text"
                  id="knowledges"
                  value={newKnowledgeName}
                  ref={inputKnowledges}
                  onChange={(e) => setNewKnowledgeName(e.target.value)}
                />
                <img
                  src={addIcon}
                  alt=""
                  className="register-addIcon"
                  ref={addKnowledgeButton}
                  onClick={handleAddNewKnowledge}
                />
                <div className="register-field-knowledges">
                  <ul>
                    {knowledges.map((knowledge) => {
                      if (knowledges.length > 4) {
                        inputKnowledges.current.setAttribute(
                          "disabled",
                          "true"
                        );
                        addKnowledgeButton.current.setAttribute(
                          "hidden",
                          "true"
                        );
                      } else {
                        inputKnowledges.current.removeAttribute("disabled");
                        addKnowledgeButton.current.removeAttribute("hidden");
                      }
                      return (
                        <li
                          key={knowledge.id}
                          onClick={() => handleRemoveKnowledge(knowledge.id)}
                        >
                          {knowledge.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="register-actions">
              <button
                disabled
                type="submit"
                onClick={handleOpenRegisterModal}
                ref={subitButton}
              >
                Cadastrar
              </button>
            </div>
            <div className="register-login">
              <p>
                já possui conta? <Link to="/login">Logar.</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
