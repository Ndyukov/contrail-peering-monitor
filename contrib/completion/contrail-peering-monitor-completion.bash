MAIN_COMMAND="contrail-peering-monitor"

_get_commands_list(){
  echo $(${MAIN_COMMAND} --help | sed -n '/Commands:/,/Options:/p' | \
  grep -Ev '(Commands|Options)' | awk -F" " '{print $1}')
}

_get_options_list(){
  echo $(${MAIN_COMMAND} $1 --help | sed -n '/Options:/,//p' | \
  grep -Ev '(Options)' | awk -F" " '{print $1 $2}' | sed 's/,/ /g')
}

_contrail_peering_monitor_completion(){
    local cur prev opts commands_case
    COMPREPLY=()
    cur="${COMP_WORDS[COMP_CWORD]}"
    prev="${COMP_WORDS[COMP_CWORD-1]}"
    commands=$(_get_commands_list)
    commands_case=$(_get_commands_list | sed 's/ / | /g')
    opts=""

    case ${prev} in
      contrail-peering-monitor )
        COMPREPLY=( $(compgen -W "${commands}" -- ${cur}) )
        return 0
        ;;
      * )
        for i in $commands
        do
          if [[ ${prev} == $i ]]
          then
            opts=$(_get_options_list ${prev})
            COMPREPLY=( $(compgen -W "${opts}" -- ${cur}) )
            return 0
          fi
        done
        ;;
    esac
}

complete -F _contrail_peering_monitor_completion contrail-peering-monitor
