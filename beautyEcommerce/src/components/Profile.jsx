import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        if (!user || !user.username) {
            navigate("/login");
        } else {
            setFormData({
                username: user.username || "",
                email: user.email || "",
                password: user.password || ""
            });
        }
    }, [user, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setFormData({
            username: user.username,
            email: user.email,
            password: user.password
        });
        setEditMode(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = {
            ...user,
            username: formData.username,
            email: formData.email,
            password: formData.password
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setEditMode(false);
        alert("Profil mis à jour avec succès!");
    };

    return (
        <div style={styles.page}>
            <div style={styles.profileContainer}>
                <div style={styles.profileHeader}>
                    <h2 style={styles.profileTitle}>Mon Profil</h2>
                    <div style={styles.buttonGroup}>
                        <button 
                            onClick={handleLogout}
                            style={styles.logoutButton}
                        >
                            Déconnexion
                        </button>
                        {!editMode && (
                            <button 
                                onClick={handleEdit}
                                style={styles.editButton}
                            >
                                Modifier le profil
                            </button>
                        )}
                    </div>
                </div>

                <div style={styles.profileContent}>
                    {editMode ? (
                        <form onSubmit={handleSubmit} style={styles.editForm}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Nom d'utilisateur</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Mot de passe</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    style={styles.input}
                                    required
                                />
                            </div>
                            <div style={styles.formActions}>
                                <button 
                                    type="submit"
                                    style={styles.saveButton}
                                >
                                    Enregistrer
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleCancel}
                                    style={styles.cancelButton}
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div style={styles.profileView}>
                            <div style={styles.avatarSection}>
                                <div style={styles.avatarPlaceholder}></div>
                                <h3 style={styles.username}>{user.username}</h3>
                            </div>
                            <div style={styles.infoSection}>
                                {user.email && (
                                    <div style={styles.infoItem}>
                                        <strong style={styles.infoLabel}>Email:</strong>
                                        <span style={styles.infoValue}>{user.email}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;

const styles = {
    page: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#f8f9fa",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        overflow: 'auto'
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: "white",
    },
    profileHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#4285f4",
        color: "white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    },
    profileTitle: {
        margin: 0,
        fontSize: "24px",
        fontWeight: "500"
    },
    buttonGroup: {
        display: "flex",
        gap: "10px"
    },
    logoutButton: {
        padding: "8px 16px",
        backgroundColor: "transparent",
        color: "white",
        border: "1px solid white",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "all 0.3s",
        ":hover": {
            backgroundColor: "rgba(255,255,255,0.2)"
        }
    },
    editButton: {
        padding: "8px 16px",
        backgroundColor: "rgba(255,255,255,0.2)",
        color: "white",
        border: "1px solid white",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "all 0.3s",
        ":hover": {
            backgroundColor: "rgba(255,255,255,0.3)"
        }
    },
    profileContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: "40px 20px",
        maxWidth: "800px",
        width: "100%",
        margin: "0 auto",
        boxSizing: 'border-box'
    },
    profileView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1
    },
    avatarSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '40px'
    },
    avatarPlaceholder: {
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        backgroundColor: "#eee",
        marginBottom: "20px",
        backgroundImage: "url('https://via.placeholder.com/120')",
        backgroundSize: "cover",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
    },
    username: {
        fontSize: "24px",
        margin: "0 0 10px",
        color: "#333",
        fontWeight: "500"
    },
    infoSection: {
        width: '100%',
        maxWidth: '500px'
    },
    infoItem: {
        display: 'flex',
        marginBottom: '15px',
        paddingBottom: '15px',
        borderBottom: '1px solid #eee'
    },
    infoLabel: {
        width: '100px',
        color: '#555'
    },
    infoValue: {
        flex: 1,
        color: '#333'
    },
    editForm: {
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '30px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    formGroup: {
        marginBottom: "20px"
    },
    label: {
        display: "block",
        marginBottom: "8px",
        fontWeight: "500",
        color: "#555",
        fontSize: '14px'
    },
    input: {
        width: "100%",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontSize: "16px",
        boxSizing: "border-box",
        transition: 'border 0.3s',
        ':focus': {
            borderColor: '#4285f4',
            outline: 'none'
        }
    },
    formActions: {
        display: "flex",
        gap: "10px",
        marginTop: "30px",
        justifyContent: 'flex-end'
    },
    saveButton: {
        padding: "12px 24px",
        backgroundColor: "#34a853",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s",
        ":hover": {
            backgroundColor: "#2d8e47"
        }
    },
    cancelButton: {
        padding: "12px 24px",
        backgroundColor: "#f1f1f1",
        color: "#333",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        transition: "background-color 0.3s",
        ":hover": {
            backgroundColor: "#ddd"
        }
    }
};