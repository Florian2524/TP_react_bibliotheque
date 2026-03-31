import { useEffect, useState } from 'react';

const emptyFormData = {
  titre: '',
  auteur: '',
  genre: '',
  date: '',
  resume: '',
  couverture: '',
};

function BookForm({
  onSubmit,
  initialValues = emptyFormData,
  submitLabel = 'Enregistrer',
}) {
  const [formData, setFormData] = useState(emptyFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData({
      ...emptyFormData,
      ...initialValues,
    });
  }, [initialValues]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
      global: '',
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.titre.trim()) {
      newErrors.titre = 'Le titre est requis';
    }

    if (!formData.auteur.trim()) {
      newErrors.auteur = "L'auteur est requis";
    }

    if (!formData.genre.trim()) {
      newErrors.genre = 'Le genre est requis';
    }

    if (!formData.date) {
      newErrors.date = 'La date est requise';
    }

    if (!formData.resume.trim()) {
      newErrors.resume = 'Le résumé est requis';
    }

    if (!formData.couverture.trim()) {
      newErrors.couverture = "L'URL de la couverture est requise";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit({
        titre: formData.titre.trim(),
        auteur: formData.auteur.trim(),
        genre: formData.genre.trim(),
        date: formData.date,
        resume: formData.resume.trim(),
        couverture: formData.couverture.trim(),
      });
    } catch (error) {
      console.error(error);
      setErrors({
        global: "Une erreur est survenue lors de l'enregistrement.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="tp-book-form" onSubmit={handleSubmit}>
      {errors.global && <p className="tp-global-error">{errors.global}</p>}

      <div className="tp-form-group">
        <label htmlFor="titre" className="tp-form-label">
          Titre <span>*</span>
        </label>
        <input
          id="titre"
          name="titre"
          type="text"
          className="tp-form-input"
          value={formData.titre}
          onChange={handleChange}
        />
        {errors.titre && <p className="tp-field-error">{errors.titre}</p>}
      </div>

      <div className="tp-form-group">
        <label htmlFor="auteur" className="tp-form-label">
          Auteur <span>*</span>
        </label>
        <input
          id="auteur"
          name="auteur"
          type="text"
          className="tp-form-input"
          value={formData.auteur}
          onChange={handleChange}
        />
        {errors.auteur && <p className="tp-field-error">{errors.auteur}</p>}
      </div>

      <div className="tp-form-group">
        <label htmlFor="genre" className="tp-form-label">
          Genre <span>*</span>
        </label>
        <input
          id="genre"
          name="genre"
          type="text"
          className="tp-form-input"
          value={formData.genre}
          onChange={handleChange}
        />
        {errors.genre && <p className="tp-field-error">{errors.genre}</p>}
      </div>

      <div className="tp-form-group">
        <label htmlFor="date" className="tp-form-label">
          Date de publication <span>*</span>
        </label>
        <input
          id="date"
          name="date"
          type="date"
          className="tp-form-input"
          value={formData.date}
          onChange={handleChange}
        />
        {errors.date && <p className="tp-field-error">{errors.date}</p>}
      </div>

      <div className="tp-form-group">
        <label htmlFor="couverture" className="tp-form-label">
          URL de la couverture
        </label>
        <input
          id="couverture"
          name="couverture"
          type="text"
          className="tp-form-input"
          value={formData.couverture}
          onChange={handleChange}
        />
        {errors.couverture && (
          <p className="tp-field-error">{errors.couverture}</p>
        )}
      </div>

      <div className="tp-form-group">
        <label htmlFor="resume" className="tp-form-label">
          Résumé <span>*</span>
        </label>
        <textarea
          id="resume"
          name="resume"
          className="tp-form-textarea"
          value={formData.resume}
          onChange={handleChange}
          rows="5"
        />
        {errors.resume && <p className="tp-field-error">{errors.resume}</p>}
      </div>

      <div className="tp-form-actions">
        <button
          type="submit"
          className="btn btn-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enregistrement...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default BookForm;