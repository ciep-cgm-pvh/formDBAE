const PersonalDataCard = () => {
  return (
    <div className="p-6">
      {/* Linha 1 */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm">1. Nome completo</label>
          <input type="text" name="nome" className="w-full border p-1" />
        </div>
        <div>
          <label className="block text-sm">2. Data de nascimento</label>
          <input type="date" name="nascimento" className="w-full border p-1" />
        </div>
      </div>

      {/* Linha 2 */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm">3. Formação profissional</label>
          <input type="text" name="formacao" className="w-full border p-1" />
        </div>
        <div>
          <label className="block text-sm">4. Cargo</label>
          <input type="text" name="cargo" className="w-full border p-1" />
        </div>
        <div>
          <label className="block text-sm">5. Cargo efetivo</label>
          <input type="text" name="cargoEfetivo" className="w-full border p-1" />
        </div>
      </div>

      {/* Linha 3 */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm">6. Órgão / Entidade</label>
          <input type="text" name="orgao" className="w-full border p-1" />
        </div>
        <div>
          <label className="block text-sm">7. Data da nomeação/designação</label>
          <input type="date" name="dataNomeacao" className="w-full border p-1" />
        </div>
      </div>

      {/* Linha 4 – Cargo público */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className='col-span-2'>
          <label className="block text-sm mb-1">
          8. Ocupa outro cargo ou emprego de quadro permanente na Administração Pública?
          </label>
          <div className="flex items-center gap-4 flex-wrap">
            <label>
              <input type="radio" name="cargoPublico" value="nao" /> Não
            </label>
            <label>
              <input type="radio" name="cargoPublico" value="sim" /> Sim
              </label>
            <input type="text" placeholder="Qual?" className="border p-1 w-40" />
          </div>
        </div>
        <div className='col-span-1'>
        <label className="block text-sm mb-1">
        Órgão/entidade de origem:
          </label>
          <input type="text" placeholder="Órgão/entidade de origem" className="border p-1 w-60" />
        </div>
      </div>

      {/* Linha 5 – Conselho */}
      <div className="mt-4">
        <label className="block text-sm mb-1">
          9. É membro de Conselho Municipal ou Conselho de Empresa Municipal?
        </label>
        <div className="flex items-center gap-4 flex-wrap">
          <label><input type="radio" name="conselho" value="nao" /> Não</label>
          <label><input type="radio" name="conselho" value="sim" /> Sim</label>
          <input type="text" placeholder="Qual(is)?" className="border p-1 w-60" />
        </div>
      </div>

      {/* Linha 6 – Endereço trabalho */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm">10. Endereço do trabalho</label>
          <input type="text" className="w-full border p-1" />
        </div>
        <div>
          <label className="block text-sm">CEP</label>
          <input type="text" className="w-full border p-1" />
        </div>
        <div>
          <label className="block text-sm">11. Telefone do trabalho</label>
          <input type="tel" className="w-full border p-1" />
        </div>
      </div>

      {/* Linha 7 – Endereço residencial */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div>
          <label className="block text-sm">12. Endereço residencial</label>
          <input type="text" className="w-full border p-1" />
        </div>
        <div>
          <label className="block text-sm">CEP</label>
          <input type="text" className="w-full border p-1" />
        </div>
        <div>
          <label className="block text-sm">13. Telefone residencial</label>
          <input type="tel" className="w-full border p-1" />
        </div>
      </div>

      {/* Linha 8 – Email e celular */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm">14. E-mail</label>
          <input type="email" className="w-full border p-1" />
        </div>
        <div>
          <label className="block text-sm">15. Celular</label>
          <input type="tel" className="w-full border p-1" />
        </div>
      </div>

      {/* Linha 9 – Endereço para correspondência e estado civil */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className='col-span-1'>
          <label className="block text-sm mb-2">16. Endereço para correspondências</label>
          <input type="text" className="w-full border p-1" />
        </div>
        <div className='col-span-2'>
          <label className="block text-sm mb-1">17. Estado Civil</label>
          <div className="flex items-center gap-4 flex-wrap">
            <label><input type="checkbox" /> Casado</label>
            <label><input type="checkbox" /> Solteiro</label>
            <label><input type="checkbox" /> Outros</label>
            <input type="text" placeholder="Qual?" className="border p-1 w-40" />
          </div>
        </div>
      </div>

      {/* Linha 10 – Cônjuge e atividade */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label className="block text-sm">18. Cônjuge / Companheiro(a)</label>
          <input type="text" className="w-full border p-1" />
        </div>
        <div>
          <label className="block text-sm">19. Atividade profissional do cônjuge</label>
          <input type="text" className="w-full border p-1" />
        </div>
      </div>

    </div>
  );
}

export default PersonalDataCard;