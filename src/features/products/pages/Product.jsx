import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function Product() {
    const navigate = useNavigate();    
    const { id } = useParams();
    const isEditMode = Boolean(id);

    return (
        <div>
            <h1>{isEditMode ? `Edit Product ${id}` : 'Create Product'}</h1>
        </div>
    );
}