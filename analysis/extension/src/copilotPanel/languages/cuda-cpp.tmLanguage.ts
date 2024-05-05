var cudaCpp = {
  information_for_contributors: ["This file has been converted from https://github.com/NVIDIA/cuda-cpp-grammar/blob/master/syntaxes/cuda-cpp.tmLanguage.json", "If you want to provide a fix or improvement, please create a pull request against the original repository.", "Once accepted there, we are happy to receive an update request."],
  version: "https://github.com/NVIDIA/cuda-cpp-grammar/commit/81e88eaec5170aa8585736c63627c73e3589998c",
  name: "CUDA C++",
  scopeName: "source.cuda-cpp",
  patterns: [{
    include: "#ever_present_context"
  }, {
    include: "#constructor_root"
  }, {
    include: "#destructor_root"
  }, {
    include: "#function_definition"
  }, {
    include: "#operator_overload"
  }, {
    include: "#using_namespace"
  }, {
    include: "#type_alias"
  }, {
    include: "#using_name"
  }, {
    include: "#namespace_alias"
  }, {
    include: "#namespace_block"
  }, {
    include: "#extern_block"
  }, {
    include: "#typedef_class"
  }, {
    include: "#typedef_struct"
  }, {
    include: "#typedef_union"
  }, {
    include: "#misc_keywords"
  }, {
    include: "#standard_declares"
  }, {
    include: "#class_block"
  }, {
    include: "#struct_block"
  }, {
    include: "#union_block"
  }, {
    include: "#enum_block"
  }, {
    include: "#template_isolated_definition"
  }, {
    include: "#template_definition"
  }, {
    include: "#access_control_keywords"
  }, {
    include: "#block"
  }, {
    include: "#static_assert"
  }, {
    include: "#assembly"
  }, {
    include: "#function_pointer"
  }, {
    include: "#evaluation_context"
  }],
  repository: {
    access_control_keywords: {
      match: "((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(((?:(?:protected)|(?:private)|(?:public)))(?:(?:\\s)+)?(:))",
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "storage.type.modifier.access.control.$4.cuda-cpp"
        },
        4: {},
        5: {
          name: "punctuation.separator.colon.access.control.cuda-cpp"
        }
      }
    },
    alignas_attribute: {
      begin: "alignas\\(",
      end: "\\)",
      beginCaptures: {
        0: {
          name: "punctuation.section.attribute.begin.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.attribute.end.cuda-cpp"
        }
      },
      name: "support.other.attribute.cuda-cpp",
      patterns: [{
        include: "#attributes_context"
      }, {
        begin: "\\(",
        end: "\\)",
        beginCaptures: {},
        endCaptures: {},
        patterns: [{
          include: "#attributes_context"
        }, {
          include: "#string_context"
        }]
      }, {
        match: "(using)(?:\\s)+((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))",
        captures: {
          1: {
            name: "keyword.other.using.directive.cuda-cpp"
          },
          2: {
            name: "entity.name.namespace.cuda-cpp"
          }
        }
      }, {
        match: ",",
        name: "punctuation.separator.attribute.cuda-cpp"
      }, {
        match: ":",
        name: "punctuation.accessor.attribute.cuda-cpp"
      }, {
        match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)(?=::)",
        name: "entity.name.namespace.cuda-cpp"
      }, {
        match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
        name: "entity.other.attribute.$0.cuda-cpp"
      }, {
        include: "#number_literal"
      }]
    },
    alignas_operator: {
      begin: "((?<!\\w)alignas(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
      end: "\\)",
      beginCaptures: {
        1: {
          name: "keyword.operator.functionlike.cuda-cpp keyword.operator.alignas.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        6: {
          name: "punctuation.section.arguments.begin.bracket.round.operator.alignas.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.arguments.end.bracket.round.operator.alignas.cuda-cpp"
        }
      },
      contentName: "meta.arguments.operator.alignas",
      patterns: [{
        include: "#evaluation_context"
      }]
    },
    alignof_operator: {
      begin: "((?<!\\w)alignof(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
      end: "\\)",
      beginCaptures: {
        1: {
          name: "keyword.operator.functionlike.cuda-cpp keyword.operator.alignof.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        6: {
          name: "punctuation.section.arguments.begin.bracket.round.operator.alignof.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.arguments.end.bracket.round.operator.alignof.cuda-cpp"
        }
      },
      contentName: "meta.arguments.operator.alignof",
      patterns: [{
        include: "#evaluation_context"
      }]
    },
    assembly: {
      begin: "(\\b(?:__asm__|asm)\\b)(?:(?:\\s)+)?((?:volatile)?)",
      end: "(?!\\G)",
      beginCaptures: {
        1: {
          name: "storage.type.asm.cuda-cpp"
        },
        2: {
          name: "storage.modifier.cuda-cpp"
        }
      },
      endCaptures: {},
      name: "meta.asm.cuda-cpp",
      patterns: [{
        match: "^((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:\\n)|$)",
        captures: {
          1: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          2: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          3: {
            name: "comment.block.cuda-cpp"
          },
          4: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          }
        }
      }, {
        include: "#comments"
      }, {
        begin: "((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\(",
        end: "\\)",
        beginCaptures: {
          0: {
            name: "punctuation.section.parens.begin.bracket.round.assembly.cuda-cpp"
          },
          1: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          2: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          3: {
            name: "comment.block.cuda-cpp"
          },
          4: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.section.parens.end.bracket.round.assembly.cuda-cpp"
          }
        },
        patterns: [{
          begin: '(R?)(")',
          end: '"',
          beginCaptures: {
            1: {
              name: "meta.encoding.cuda-cpp"
            },
            2: {
              name: "punctuation.definition.string.begin.assembly.cuda-cpp"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.definition.string.end.assembly.cuda-cpp"
            }
          },
          name: "string.quoted.double.cuda-cpp",
          contentName: "meta.embedded.assembly",
          patterns: [{
            include: "source.asm"
          }, {
            include: "source.x86"
          }, {
            include: "source.x86_64"
          }, {
            include: "source.arm"
          }, {
            include: "#backslash_escapes"
          }, {
            include: "#string_escaped_char"
          }]
        }, {
          begin: "\\(",
          end: "\\)",
          beginCaptures: {
            0: {
              name: "punctuation.section.parens.begin.bracket.round.assembly.inner.cuda-cpp"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.section.parens.end.bracket.round.assembly.inner.cuda-cpp"
            }
          },
          patterns: [{
            include: "#evaluation_context"
          }]
        }, {
          match: "\\[((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\]",
          captures: {
            1: {
              patterns: [{
                include: "#inline_comment"
              }]
            },
            2: {
              name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
            },
            3: {
              name: "comment.block.cuda-cpp"
            },
            4: {
              patterns: [{
                match: "\\*\\/",
                name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
              }, {
                match: "\\*",
                name: "comment.block.cuda-cpp"
              }]
            },
            5: {
              name: "variable.other.asm.label.cuda-cpp"
            },
            6: {
              patterns: [{
                include: "#inline_comment"
              }]
            },
            7: {
              name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
            },
            8: {
              name: "comment.block.cuda-cpp"
            },
            9: {
              patterns: [{
                match: "\\*\\/",
                name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
              }, {
                match: "\\*",
                name: "comment.block.cuda-cpp"
              }]
            }
          }
        }, {
          match: ":",
          name: "punctuation.separator.delimiter.colon.assembly.cuda-cpp"
        }, {
          include: "#comments"
        }]
      }]
    },
    assignment_operator: {
      match: "\\=",
      name: "keyword.operator.assignment.cuda-cpp"
    },
    attributes_context: {
      patterns: [{
        include: "#cpp_attributes"
      }, {
        include: "#gcc_attributes"
      }, {
        include: "#ms_attributes"
      }, {
        include: "#alignas_attribute"
      }]
    },
    backslash_escapes: {
      match: `(?x)\\\\ (
\\\\			 |
[abefnprtv'"?]   |
[0-3][0-7]{,2}	 |
[4-7]\\d?		|
x[a-fA-F0-9]{,2} |
u[a-fA-F0-9]{,4} |
U[a-fA-F0-9]{,8} )`,
      name: "constant.character.escape"
    },
    block: {
      begin: "{",
      end: "}|(?=\\s*#\\s*(?:elif|else|endif)\\b)",
      beginCaptures: {
        0: {
          name: "punctuation.section.block.begin.bracket.curly.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.block.end.bracket.curly.cuda-cpp"
        }
      },
      name: "meta.block.cuda-cpp",
      patterns: [{
        include: "#function_body_context"
      }]
    },
    block_comment: {
      begin: "\\s*+(\\/\\*)",
      end: "\\*\\/",
      beginCaptures: {
        1: {
          name: "punctuation.definition.comment.begin.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.definition.comment.end.cuda-cpp"
        }
      },
      name: "comment.block.cuda-cpp"
    },
    builtin_storage_type_initilizer: {
      begin: "(?:\\s)*+(?<!\\w)(?:(?:(?:((?:(?:threadIdx)|(?:unsigned)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:wchar_t)|(?:gridDim)|(?:signed)|(?:double)|(?:short)|(?:float)|(?:auto)|(?:void)|(?:char)|(?:long)|(?:bool)|(?:int)))|((?:(?:uint_least16_t)|(?:uint_least32_t)|(?:uint_least64_t)|(?:int_least16_t)|(?:int_least32_t)|(?:int_least64_t)|(?:uint_least8_t)|(?:uint_fast16_t)|(?:uint_fast32_t)|(?:uint_fast64_t)|(?:int_least8_t)|(?:int_fast16_t)|(?:int_fast32_t)|(?:int_fast64_t)|(?:uint_fast8_t)|(?:suseconds_t)|(?:int_fast8_t)|(?:useconds_t)|(?:ulonglong1)|(?:ulonglong2)|(?:ulonglong3)|(?:ulonglong4)|(?:blksize_t)|(?:in_addr_t)|(?:in_port_t)|(?:uintptr_t)|(?:uintmax_t)|(?:uintmax_t)|(?:uintmax_t)|(?:longlong1)|(?:longlong2)|(?:longlong3)|(?:longlong4)|(?:u_quad_t)|(?:blkcnt_t)|(?:uint16_t)|(?:uint32_t)|(?:uint64_t)|(?:intptr_t)|(?:intmax_t)|(?:intmax_t)|(?:u_short)|(?:qaddr_t)|(?:caddr_t)|(?:daddr_t)|(?:fixpt_t)|(?:nlink_t)|(?:segsz_t)|(?:swblk_t)|(?:clock_t)|(?:ssize_t)|(?:int16_t)|(?:int32_t)|(?:int64_t)|(?:uint8_t)|(?:ushort1)|(?:ushort2)|(?:ushort3)|(?:ushort4)|(?:double1)|(?:double2)|(?:double3)|(?:double4)|(?:u_char)|(?:u_long)|(?:ushort)|(?:quad_t)|(?:mode_t)|(?:size_t)|(?:time_t)|(?:int8_t)|(?:uchar1)|(?:uchar2)|(?:uchar3)|(?:uchar4)|(?:short1)|(?:short2)|(?:short3)|(?:short4)|(?:ulong4)|(?:ulong1)|(?:ulong2)|(?:ulong3)|(?:ulong4)|(?:float1)|(?:float2)|(?:float3)|(?:float4)|(?:u_int)|(?:div_t)|(?:dev_t)|(?:gid_t)|(?:ino_t)|(?:key_t)|(?:pid_t)|(?:off_t)|(?:uid_t)|(?:char1)|(?:char2)|(?:char3)|(?:char4)|(?:uint1)|(?:uint2)|(?:uint3)|(?:uint4)|(?:long1)|(?:long2)|(?:long3)|(?:uint)|(?:id_t)|(?:id_t)|(?:int1)|(?:int2)|(?:int3)|(?:int4)|(?:dim3))))|((?:(?:pthread_rwlockattr_t)|(?:pthread_mutexattr_t)|(?:pthread_condattr_t)|(?:pthread_rwlock_t)|(?:pthread_mutex_t)|(?:pthread_attr_t)|(?:pthread_cond_t)|(?:pthread_once_t)|(?:pthread_key_t)|(?:pthread_t))))|([a-zA-Z_](?:\\w)*_t))(?!\\w)(?:\\s)*+(?<!\\w)(\\()",
      end: "\\)",
      beginCaptures: {
        1: {
          name: "storage.type.primitive.cuda-cpp storage.type.built-in.primitive.cuda-cpp"
        },
        2: {
          name: "storage.type.cuda-cpp storage.type.built-in.cuda-cpp"
        },
        3: {
          name: "support.type.posix-reserved.pthread.cuda-cpp support.type.built-in.posix-reserved.pthread.cuda-cpp"
        },
        4: {
          name: "support.type.posix-reserved.cuda-cpp support.type.built-in.posix-reserved.cuda-cpp"
        },
        5: {
          name: "punctuation.section.arguments.begin.bracket.round.initializer.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.arguments.end.bracket.round.initializer.cuda-cpp"
        }
      },
      patterns: [{
        include: "#evaluation_context"
      }]
    },
    case_statement: {
      begin: "((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)case(?!\\w))",
      end: ":",
      beginCaptures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          name: "keyword.control.case.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.separator.colon.case.cuda-cpp"
        }
      },
      name: "meta.conditional.case.cuda-cpp",
      patterns: [{
        include: "#evaluation_context"
      }, {
        include: "#c_conditional_context"
      }]
    },
    class_block: {
      begin: "((?<!\\w)class(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?={)|(?:((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*+)?(?:((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(:(?!:)))?)",
      end: "(?:(?:(?<=\\}|%>|\\?\\?>)(?:(?:\\s)+)?(;)|(;))|(?=[;>\\[\\]=]))",
      beginCaptures: {
        0: {
          name: "meta.head.class.cuda-cpp"
        },
        1: {
          name: "storage.type.$1.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        6: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        7: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        8: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        9: {
          name: "comment.block.cuda-cpp"
        },
        10: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        11: {
          patterns: [{
            match: "((?<!\\w)final(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))",
            captures: {
              1: {
                name: "storage.type.modifier.final.cuda-cpp"
              },
              2: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              3: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              4: {
                name: "comment.block.cuda-cpp"
              },
              5: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }, {
            match: "((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:((?<!\\w)final(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=:|{|$)",
            captures: {
              1: {
                name: "entity.name.type.class.cuda-cpp"
              },
              2: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              3: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              4: {
                name: "comment.block.cuda-cpp"
              },
              5: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              6: {
                name: "storage.type.modifier.final.cuda-cpp"
              },
              7: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              8: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              9: {
                name: "comment.block.cuda-cpp"
              },
              10: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }, {
            match: "DLLEXPORT",
            name: "entity.name.other.preprocessor.macro.predefined.DLLEXPORT.cuda-cpp"
          }, {
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.other.preprocessor.macro.predefined.probably.$0.cuda-cpp"
          }]
        },
        12: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        13: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        14: {
          name: "comment.block.cuda-cpp"
        },
        15: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        16: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        17: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        18: {
          name: "comment.block.cuda-cpp"
        },
        19: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        20: {
          name: "punctuation.separator.colon.inheritance.cuda-cpp"
        }
      },
      endCaptures: {
        1: {
          name: "punctuation.terminator.statement.cuda-cpp"
        },
        2: {
          name: "punctuation.terminator.statement.cuda-cpp"
        }
      },
      name: "meta.block.class.cuda-cpp",
      patterns: [{
        begin: "\\G ?",
        end: "(?:\\{|<%|\\?\\?<|(?=;))",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.class.cuda-cpp"
          }
        },
        name: "meta.head.class.cuda-cpp",
        patterns: [{
          include: "#ever_present_context"
        }, {
          include: "#inheritance_context"
        }, {
          include: "#template_call_range"
        }]
      }, {
        begin: "(?<=\\{|<%|\\?\\?<)",
        end: "\\}|%>|\\?\\?>",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.class.cuda-cpp"
          }
        },
        name: "meta.body.class.cuda-cpp",
        patterns: [{
          include: "#function_pointer"
        }, {
          include: "#static_assert"
        }, {
          include: "#constructor_inline"
        }, {
          include: "#destructor_inline"
        }, {
          include: "$self"
        }]
      }, {
        begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
        end: "[\\s]*(?=;)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.tail.class.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }]
    },
    class_declare: {
      match: "((?<!\\w)class(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\b(?!override\\W|override\\$|final\\W|final\\$)((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\S)(?![:{a-zA-Z])",
      captures: {
        1: {
          name: "storage.type.class.declare.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        4: {
          name: "entity.name.type.class.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        6: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        7: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        8: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        9: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        10: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        11: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        12: {
          name: "variable.other.object.declare.cuda-cpp"
        },
        13: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        14: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      }
    },
    comma: {
      match: ",",
      name: "punctuation.separator.delimiter.comma.cuda-cpp"
    },
    comma_in_template_argument: {
      match: ",",
      name: "punctuation.separator.delimiter.comma.template.argument.cuda-cpp"
    },
    comments: {
      patterns: [{
        begin: "^(?:(?:\\s)+)?+(\\/\\/[!\\/]+)",
        end: "(?<=\\n)(?<!\\\\\\n)",
        beginCaptures: {
          1: {
            name: "punctuation.definition.comment.documentation.cuda-cpp"
          }
        },
        endCaptures: {},
        name: "comment.line.double-slash.documentation.cuda-cpp",
        patterns: [{
          include: "#line_continuation_character"
        }, {
          match: '(?<=[\\s*!\\/])[\\\\@](?:callergraph|callgraph|else|endif|f\\$|f\\[|f\\]|hidecallergraph|hidecallgraph|hiderefby|hiderefs|hideinitializer|htmlinclude|n|nosubgrouping|private|privatesection|protected|protectedsection|public|publicsection|pure|showinitializer|showrefby|showrefs|tableofcontents|\\$|\\#|<|>|%|"|\\.|=|::|\\||\\-\\-|\\-\\-\\-)\\b(?:\\{[^}]*\\})?',
          name: "storage.type.class.doxygen.cuda-cpp"
        }, {
          match: "((?<=[\\s*!\\/])[\\\\@](?:a|em|e))(?:\\s)+(\\S+)",
          captures: {
            1: {
              name: "storage.type.class.doxygen.cuda-cpp"
            },
            2: {
              name: "markup.italic.doxygen.cuda-cpp"
            }
          }
        }, {
          match: "((?<=[\\s*!\\/])[\\\\@]b)(?:\\s)+(\\S+)",
          captures: {
            1: {
              name: "storage.type.class.doxygen.cuda-cpp"
            },
            2: {
              name: "markup.bold.doxygen.cuda-cpp"
            }
          }
        }, {
          match: "((?<=[\\s*!\\/])[\\\\@](?:c|p))(?:\\s)+(\\S+)",
          captures: {
            1: {
              name: "storage.type.class.doxygen.cuda-cpp"
            },
            2: {
              name: "markup.inline.raw.string.cuda-cpp"
            }
          }
        }, {
          match: "(?<=[\\s*!\\/])[\\\\@](?:a|anchor|b|c|cite|copybrief|copydetail|copydoc|def|dir|dontinclude|e|em|emoji|enum|example|extends|file|idlexcept|implements|include|includedoc|includelineno|latexinclude|link|memberof|namespace|p|package|ref|refitem|related|relates|relatedalso|relatesalso|verbinclude)\\b(?:\\{[^}]*\\})?",
          name: "storage.type.class.doxygen.cuda-cpp"
        }, {
          match: "(?<=[\\s*!\\/])[\\\\@](?:addindex|addtogroup|category|class|defgroup|diafile|dotfile|elseif|fn|headerfile|if|ifnot|image|ingroup|interface|line|mainpage|mscfile|name|overload|page|property|protocol|section|skip|skipline|snippet|snippetdoc|snippetlineno|struct|subpage|subsection|subsubsection|typedef|union|until|vhdlflow|weakgroup)\\b(?:\\{[^}]*\\})?",
          name: "storage.type.class.doxygen.cuda-cpp"
        }, {
          match: "((?<=[\\s*!\\/])[\\\\@]param)(?:\\s*\\[((?:,?(?:(?:\\s)+)?(?:in|out)(?:(?:\\s)+)?)+)\\])?(?:\\s)+(\\b\\w+\\b)",
          captures: {
            1: {
              name: "storage.type.class.doxygen.cuda-cpp"
            },
            2: {
              patterns: [{
                match: "in|out",
                name: "keyword.other.parameter.direction.$0.cuda-cpp"
              }]
            },
            3: {
              name: "variable.parameter.cuda-cpp"
            }
          }
        }, {
          match: "(?<=[\\s*!\\/])[\\\\@](?:arg|attention|author|authors|brief|bug|copyright|date|deprecated|details|exception|invariant|li|note|par|paragraph|param|post|pre|remark|remarks|result|return|returns|retval|sa|see|short|since|test|throw|throws|todo|tparam|version|warning|xrefitem)\\b(?:\\{[^}]*\\})?",
          name: "storage.type.class.doxygen.cuda-cpp"
        }, {
          match: "(?<=[\\s*!\\/])[\\\\@](?:code|cond|docbookonly|dot|htmlonly|internal|latexonly|link|manonly|msc|parblock|rtfonly|secreflist|startuml|verbatim|xmlonly|endcode|endcond|enddocbookonly|enddot|endhtmlonly|endinternal|endlatexonly|endlink|endmanonly|endmsc|endparblock|endrtfonly|endsecreflist|enduml|endverbatim|endxmlonly)\\b(?:\\{[^}]*\\})?",
          name: "storage.type.class.doxygen.cuda-cpp"
        }, {
          match: "(?:\\b[A-Z]+:|@[a-z_]+:)",
          name: "storage.type.class.gtkdoc.cuda-cpp"
        }]
      }, {
        match: "(\\/\\*[!*]+(?=\\s))(.+)([!*]*\\*\\/)",
        captures: {
          1: {
            name: "punctuation.definition.comment.begin.documentation.cuda-cpp"
          },
          2: {
            patterns: [{
              match: '(?<=[\\s*!\\/])[\\\\@](?:callergraph|callgraph|else|endif|f\\$|f\\[|f\\]|hidecallergraph|hidecallgraph|hiderefby|hiderefs|hideinitializer|htmlinclude|n|nosubgrouping|private|privatesection|protected|protectedsection|public|publicsection|pure|showinitializer|showrefby|showrefs|tableofcontents|\\$|\\#|<|>|%|"|\\.|=|::|\\||\\-\\-|\\-\\-\\-)\\b(?:\\{[^}]*\\})?',
              name: "storage.type.class.doxygen.cuda-cpp"
            }, {
              match: "((?<=[\\s*!\\/])[\\\\@](?:a|em|e))(?:\\s)+(\\S+)",
              captures: {
                1: {
                  name: "storage.type.class.doxygen.cuda-cpp"
                },
                2: {
                  name: "markup.italic.doxygen.cuda-cpp"
                }
              }
            }, {
              match: "((?<=[\\s*!\\/])[\\\\@]b)(?:\\s)+(\\S+)",
              captures: {
                1: {
                  name: "storage.type.class.doxygen.cuda-cpp"
                },
                2: {
                  name: "markup.bold.doxygen.cuda-cpp"
                }
              }
            }, {
              match: "((?<=[\\s*!\\/])[\\\\@](?:c|p))(?:\\s)+(\\S+)",
              captures: {
                1: {
                  name: "storage.type.class.doxygen.cuda-cpp"
                },
                2: {
                  name: "markup.inline.raw.string.cuda-cpp"
                }
              }
            }, {
              match: "(?<=[\\s*!\\/])[\\\\@](?:a|anchor|b|c|cite|copybrief|copydetail|copydoc|def|dir|dontinclude|e|em|emoji|enum|example|extends|file|idlexcept|implements|include|includedoc|includelineno|latexinclude|link|memberof|namespace|p|package|ref|refitem|related|relates|relatedalso|relatesalso|verbinclude)\\b(?:\\{[^}]*\\})?",
              name: "storage.type.class.doxygen.cuda-cpp"
            }, {
              match: "(?<=[\\s*!\\/])[\\\\@](?:addindex|addtogroup|category|class|defgroup|diafile|dotfile|elseif|fn|headerfile|if|ifnot|image|ingroup|interface|line|mainpage|mscfile|name|overload|page|property|protocol|section|skip|skipline|snippet|snippetdoc|snippetlineno|struct|subpage|subsection|subsubsection|typedef|union|until|vhdlflow|weakgroup)\\b(?:\\{[^}]*\\})?",
              name: "storage.type.class.doxygen.cuda-cpp"
            }, {
              match: "((?<=[\\s*!\\/])[\\\\@]param)(?:\\s*\\[((?:,?(?:(?:\\s)+)?(?:in|out)(?:(?:\\s)+)?)+)\\])?(?:\\s)+(\\b\\w+\\b)",
              captures: {
                1: {
                  name: "storage.type.class.doxygen.cuda-cpp"
                },
                2: {
                  patterns: [{
                    match: "in|out",
                    name: "keyword.other.parameter.direction.$0.cuda-cpp"
                  }]
                },
                3: {
                  name: "variable.parameter.cuda-cpp"
                }
              }
            }, {
              match: "(?<=[\\s*!\\/])[\\\\@](?:arg|attention|author|authors|brief|bug|copyright|date|deprecated|details|exception|invariant|li|note|par|paragraph|param|post|pre|remark|remarks|result|return|returns|retval|sa|see|short|since|test|throw|throws|todo|tparam|version|warning|xrefitem)\\b(?:\\{[^}]*\\})?",
              name: "storage.type.class.doxygen.cuda-cpp"
            }, {
              match: "(?<=[\\s*!\\/])[\\\\@](?:code|cond|docbookonly|dot|htmlonly|internal|latexonly|link|manonly|msc|parblock|rtfonly|secreflist|startuml|verbatim|xmlonly|endcode|endcond|enddocbookonly|enddot|endhtmlonly|endinternal|endlatexonly|endlink|endmanonly|endmsc|endparblock|endrtfonly|endsecreflist|enduml|endverbatim|endxmlonly)\\b(?:\\{[^}]*\\})?",
              name: "storage.type.class.doxygen.cuda-cpp"
            }, {
              match: "(?:\\b[A-Z]+:|@[a-z_]+:)",
              name: "storage.type.class.gtkdoc.cuda-cpp"
            }]
          },
          3: {
            name: "punctuation.definition.comment.end.documentation.cuda-cpp"
          }
        },
        name: "comment.block.documentation.cuda-cpp"
      }, {
        begin: "(?:(?:\\s)+)?+\\/\\*[!*]+(?:(?:(?:\\n)|$)|(?=\\s))",
        end: "[!*]*\\*\\/",
        beginCaptures: {
          0: {
            name: "punctuation.definition.comment.begin.documentation.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.definition.comment.end.documentation.cuda-cpp"
          }
        },
        name: "comment.block.documentation.cuda-cpp",
        patterns: [{
          match: '(?<=[\\s*!\\/])[\\\\@](?:callergraph|callgraph|else|endif|f\\$|f\\[|f\\]|hidecallergraph|hidecallgraph|hiderefby|hiderefs|hideinitializer|htmlinclude|n|nosubgrouping|private|privatesection|protected|protectedsection|public|publicsection|pure|showinitializer|showrefby|showrefs|tableofcontents|\\$|\\#|<|>|%|"|\\.|=|::|\\||\\-\\-|\\-\\-\\-)\\b(?:\\{[^}]*\\})?',
          name: "storage.type.class.doxygen.cuda-cpp"
        }, {
          match: "((?<=[\\s*!\\/])[\\\\@](?:a|em|e))(?:\\s)+(\\S+)",
          captures: {
            1: {
              name: "storage.type.class.doxygen.cuda-cpp"
            },
            2: {
              name: "markup.italic.doxygen.cuda-cpp"
            }
          }
        }, {
          match: "((?<=[\\s*!\\/])[\\\\@]b)(?:\\s)+(\\S+)",
          captures: {
            1: {
              name: "storage.type.class.doxygen.cuda-cpp"
            },
            2: {
              name: "markup.bold.doxygen.cuda-cpp"
            }
          }
        }, {
          match: "((?<=[\\s*!\\/])[\\\\@](?:c|p))(?:\\s)+(\\S+)",
          captures: {
            1: {
              name: "storage.type.class.doxygen.cuda-cpp"
            },
            2: {
              name: "markup.inline.raw.string.cuda-cpp"
            }
          }
        }, {
          match: "(?<=[\\s*!\\/])[\\\\@](?:a|anchor|b|c|cite|copybrief|copydetail|copydoc|def|dir|dontinclude|e|em|emoji|enum|example|extends|file|idlexcept|implements|include|includedoc|includelineno|latexinclude|link|memberof|namespace|p|package|ref|refitem|related|relates|relatedalso|relatesalso|verbinclude)\\b(?:\\{[^}]*\\})?",
          name: "storage.type.class.doxygen.cuda-cpp"
        }, {
          match: "(?<=[\\s*!\\/])[\\\\@](?:addindex|addtogroup|category|class|defgroup|diafile|dotfile|elseif|fn|headerfile|if|ifnot|image|ingroup|interface|line|mainpage|mscfile|name|overload|page|property|protocol|section|skip|skipline|snippet|snippetdoc|snippetlineno|struct|subpage|subsection|subsubsection|typedef|union|until|vhdlflow|weakgroup)\\b(?:\\{[^}]*\\})?",
          name: "storage.type.class.doxygen.cuda-cpp"
        }, {
          match: "((?<=[\\s*!\\/])[\\\\@]param)(?:\\s*\\[((?:,?(?:(?:\\s)+)?(?:in|out)(?:(?:\\s)+)?)+)\\])?(?:\\s)+(\\b\\w+\\b)",
          captures: {
            1: {
              name: "storage.type.class.doxygen.cuda-cpp"
            },
            2: {
              patterns: [{
                match: "in|out",
                name: "keyword.other.parameter.direction.$0.cuda-cpp"
              }]
            },
            3: {
              name: "variable.parameter.cuda-cpp"
            }
          }
        }, {
          match: "(?<=[\\s*!\\/])[\\\\@](?:arg|attention|author|authors|brief|bug|copyright|date|deprecated|details|exception|invariant|li|note|par|paragraph|param|post|pre|remark|remarks|result|return|returns|retval|sa|see|short|since|test|throw|throws|todo|tparam|version|warning|xrefitem)\\b(?:\\{[^}]*\\})?",
          name: "storage.type.class.doxygen.cuda-cpp"
        }, {
          match: "(?<=[\\s*!\\/])[\\\\@](?:code|cond|docbookonly|dot|htmlonly|internal|latexonly|link|manonly|msc|parblock|rtfonly|secreflist|startuml|verbatim|xmlonly|endcode|endcond|enddocbookonly|enddot|endhtmlonly|endinternal|endlatexonly|endlink|endmanonly|endmsc|endparblock|endrtfonly|endsecreflist|enduml|endverbatim|endxmlonly)\\b(?:\\{[^}]*\\})?",
          name: "storage.type.class.doxygen.cuda-cpp"
        }, {
          match: "(?:\\b[A-Z]+:|@[a-z_]+:)",
          name: "storage.type.class.gtkdoc.cuda-cpp"
        }]
      }, {
        include: "#emacs_file_banner"
      }, {
        include: "#block_comment"
      }, {
        include: "#line_comment"
      }, {
        include: "#invalid_comment_end"
      }]
    },
    constructor_inline: {
      begin: "^((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:(?:(?:__forceinline__)|(?:__noinline__)|(?:__global__)|(?:__device__)|(?:constexpr)|(?:explicit)|(?:__host__)|(?:mutable)|(?:virtual)|(?:inline)|(?:friend))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:__cdecl|__clrcall|__stdcall|__fastcall|__thiscall|__vectorcall)?)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)(?=\\())",
      end: "(?:(?<=\\}|%>|\\?\\?>)|(?=[;>\\[\\]=]))",
      beginCaptures: {
        0: {
          name: "meta.head.function.definition.special.constructor.cuda-cpp"
        },
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          patterns: [{
            include: "#functional_specifiers_pre_parameters"
          }]
        },
        6: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        7: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        8: {
          name: "comment.block.cuda-cpp"
        },
        9: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        10: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        11: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        12: {
          name: "comment.block.cuda-cpp"
        },
        13: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        14: {
          name: "storage.type.modifier.calling-convention.cuda-cpp"
        },
        15: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        16: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        17: {
          name: "comment.block.cuda-cpp"
        },
        18: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        19: {
          name: "entity.name.function.constructor.cuda-cpp entity.name.function.definition.special.constructor.cuda-cpp"
        }
      },
      endCaptures: {},
      name: "meta.function.definition.special.constructor.cuda-cpp",
      patterns: [{
        begin: "\\G ?",
        end: "(?:\\{|<%|\\?\\?<|(?=;))",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.function.definition.special.constructor.cuda-cpp"
          }
        },
        name: "meta.head.function.definition.special.constructor.cuda-cpp",
        patterns: [{
          include: "#ever_present_context"
        }, {
          match: "(\\=)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(default)|(delete))",
          captures: {
            1: {
              name: "keyword.operator.assignment.cuda-cpp"
            },
            2: {
              patterns: [{
                include: "#inline_comment"
              }]
            },
            3: {
              name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
            },
            4: {
              name: "comment.block.cuda-cpp"
            },
            5: {
              patterns: [{
                match: "\\*\\/",
                name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
              }, {
                match: "\\*",
                name: "comment.block.cuda-cpp"
              }]
            },
            6: {
              name: "keyword.other.default.constructor.cuda-cpp"
            },
            7: {
              name: "keyword.other.delete.constructor.cuda-cpp"
            }
          }
        }, {
          include: "#functional_specifiers_pre_parameters"
        }, {
          begin: ":",
          end: "(?=\\{)",
          beginCaptures: {
            0: {
              name: "punctuation.separator.initializers.cuda-cpp"
            }
          },
          endCaptures: {},
          patterns: [{
            begin: `((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<3>?)+>)(?:\\s)*+)?(\\()`,
            end: "\\)",
            beginCaptures: {
              1: {
                name: "entity.name.function.call.initializer.cuda-cpp"
              },
              2: {
                name: "meta.template.call.cuda-cpp",
                patterns: [{
                  include: "#template_call_range"
                }]
              },
              3: {},
              4: {
                name: "punctuation.section.arguments.begin.bracket.round.function.call.initializer.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.arguments.end.bracket.round.function.call.initializer.cuda-cpp"
              }
            },
            contentName: "meta.parameter.initialization",
            patterns: [{
              include: "#evaluation_context"
            }]
          }, {
            begin: "((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(\\{)",
            end: "\\}",
            beginCaptures: {
              1: {
                name: "entity.name.function.call.initializer.cuda-cpp"
              },
              2: {
                name: "punctuation.section.arguments.begin.bracket.round.function.call.initializer.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.arguments.end.bracket.round.function.call.initializer.cuda-cpp"
              }
            },
            contentName: "meta.parameter.initialization",
            patterns: [{
              include: "#evaluation_context"
            }]
          }, {
            match: ",",
            name: "punctuation.separator.delimiter.comma.cuda-cpp"
          }, {
            include: "#comments"
          }]
        }, {
          begin: "\\(",
          end: "\\)",
          beginCaptures: {
            0: {
              name: "punctuation.section.parameters.begin.bracket.round.special.constructor.cuda-cpp"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.section.parameters.end.bracket.round.special.constructor.cuda-cpp"
            }
          },
          contentName: "meta.function.definition.parameters.special.constructor",
          patterns: [{
            include: "#function_parameter_context"
          }, {
            include: "#evaluation_context"
          }]
        }, {
          match: "((?:(?:final)|(?:override)))+",
          captures: {
            1: {
              name: "keyword.operator.$1.cuda-cpp"
            }
          }
        }, {
          include: "$self"
        }]
      }, {
        begin: "(?<=\\{|<%|\\?\\?<)",
        end: "\\}|%>|\\?\\?>",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.function.definition.special.constructor.cuda-cpp"
          }
        },
        name: "meta.body.function.definition.special.constructor.cuda-cpp",
        patterns: [{
          include: "#function_body_context"
        }]
      }, {
        begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
        end: "[\\s]*(?=;)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.tail.function.definition.special.constructor.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }]
    },
    constructor_root: {
      begin: `\\s*+((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:__cdecl|__clrcall|__stdcall|__fastcall|__thiscall|__vectorcall)?)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<12>?)+>)(?:\\s)*+)?::)*+)(((?>(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))::((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\14((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\())`,
      end: "(?:(?<=\\}|%>|\\?\\?>)|(?=[;>\\[\\]=]))",
      beginCaptures: {
        0: {
          name: "meta.head.function.definition.special.constructor.cuda-cpp"
        },
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          name: "storage.type.modifier.calling-convention.cuda-cpp"
        },
        6: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        7: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        8: {
          name: "comment.block.cuda-cpp"
        },
        9: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        10: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.constructor.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.constructor.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        11: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        12: {},
        13: {
          patterns: [{
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?=:)",
            name: "entity.name.type.constructor.cuda-cpp"
          }, {
            match: "(?<=:)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.function.definition.special.constructor.cuda-cpp"
          }, {
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.constructor.cuda-cpp"
          }]
        },
        14: {},
        15: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        16: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        17: {
          name: "comment.block.cuda-cpp"
        },
        18: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        19: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        20: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        21: {
          name: "comment.block.cuda-cpp"
        },
        22: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        23: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        24: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        25: {
          name: "comment.block.cuda-cpp"
        },
        26: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        }
      },
      endCaptures: {},
      name: "meta.function.definition.special.constructor.cuda-cpp",
      patterns: [{
        begin: "\\G ?",
        end: "(?:\\{|<%|\\?\\?<|(?=;))",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.function.definition.special.constructor.cuda-cpp"
          }
        },
        name: "meta.head.function.definition.special.constructor.cuda-cpp",
        patterns: [{
          include: "#ever_present_context"
        }, {
          match: "(\\=)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(default)|(delete))",
          captures: {
            1: {
              name: "keyword.operator.assignment.cuda-cpp"
            },
            2: {
              patterns: [{
                include: "#inline_comment"
              }]
            },
            3: {
              name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
            },
            4: {
              name: "comment.block.cuda-cpp"
            },
            5: {
              patterns: [{
                match: "\\*\\/",
                name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
              }, {
                match: "\\*",
                name: "comment.block.cuda-cpp"
              }]
            },
            6: {
              name: "keyword.other.default.constructor.cuda-cpp"
            },
            7: {
              name: "keyword.other.delete.constructor.cuda-cpp"
            }
          }
        }, {
          include: "#functional_specifiers_pre_parameters"
        }, {
          begin: ":",
          end: "(?=\\{)",
          beginCaptures: {
            0: {
              name: "punctuation.separator.initializers.cuda-cpp"
            }
          },
          endCaptures: {},
          patterns: [{
            begin: `((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<3>?)+>)(?:\\s)*+)?(\\()`,
            end: "\\)",
            beginCaptures: {
              1: {
                name: "entity.name.function.call.initializer.cuda-cpp"
              },
              2: {
                name: "meta.template.call.cuda-cpp",
                patterns: [{
                  include: "#template_call_range"
                }]
              },
              3: {},
              4: {
                name: "punctuation.section.arguments.begin.bracket.round.function.call.initializer.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.arguments.end.bracket.round.function.call.initializer.cuda-cpp"
              }
            },
            contentName: "meta.parameter.initialization",
            patterns: [{
              include: "#evaluation_context"
            }]
          }, {
            begin: "((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(\\{)",
            end: "\\}",
            beginCaptures: {
              1: {
                name: "entity.name.function.call.initializer.cuda-cpp"
              },
              2: {
                name: "punctuation.section.arguments.begin.bracket.round.function.call.initializer.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.arguments.end.bracket.round.function.call.initializer.cuda-cpp"
              }
            },
            contentName: "meta.parameter.initialization",
            patterns: [{
              include: "#evaluation_context"
            }]
          }, {
            match: ",",
            name: "punctuation.separator.delimiter.comma.cuda-cpp"
          }, {
            include: "#comments"
          }]
        }, {
          begin: "\\(",
          end: "\\)",
          beginCaptures: {
            0: {
              name: "punctuation.section.parameters.begin.bracket.round.special.constructor.cuda-cpp"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.section.parameters.end.bracket.round.special.constructor.cuda-cpp"
            }
          },
          contentName: "meta.function.definition.parameters.special.constructor",
          patterns: [{
            include: "#function_parameter_context"
          }, {
            include: "#evaluation_context"
          }]
        }, {
          match: "((?:(?:final)|(?:override)))+",
          captures: {
            1: {
              name: "keyword.operator.$1.cuda-cpp"
            }
          }
        }, {
          include: "$self"
        }]
      }, {
        begin: "(?<=\\{|<%|\\?\\?<)",
        end: "\\}|%>|\\?\\?>",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.function.definition.special.constructor.cuda-cpp"
          }
        },
        name: "meta.body.function.definition.special.constructor.cuda-cpp",
        patterns: [{
          include: "#function_body_context"
        }]
      }, {
        begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
        end: "[\\s]*(?=;)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.tail.function.definition.special.constructor.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }]
    },
    control_flow_keywords: {
      match: "((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:(?:co_return)|(?:continue)|(?:co_await)|(?:co_yield)|(?:default)|(?:switch)|(?:return)|(?:throw)|(?:while)|(?:catch)|(?:break)|(?:else)|(?:goto)|(?:case)|(?:for)|(?:try)|(?:do)|(?:if))(?!\\w))",
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "keyword.control.$3.cuda-cpp"
        }
      }
    },
    cpp_attributes: {
      begin: "\\[\\[",
      end: "\\]\\]",
      beginCaptures: {
        0: {
          name: "punctuation.section.attribute.begin.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.attribute.end.cuda-cpp"
        }
      },
      name: "support.other.attribute.cuda-cpp",
      patterns: [{
        include: "#attributes_context"
      }, {
        begin: "\\(",
        end: "\\)",
        beginCaptures: {},
        endCaptures: {},
        patterns: [{
          include: "#attributes_context"
        }, {
          include: "#string_context"
        }]
      }, {
        match: "(using)(?:\\s)+((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))",
        captures: {
          1: {
            name: "keyword.other.using.directive.cuda-cpp"
          },
          2: {
            name: "entity.name.namespace.cuda-cpp"
          }
        }
      }, {
        match: ",",
        name: "punctuation.separator.attribute.cuda-cpp"
      }, {
        match: ":",
        name: "punctuation.accessor.attribute.cuda-cpp"
      }, {
        match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)(?=::)",
        name: "entity.name.namespace.cuda-cpp"
      }, {
        match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
        name: "entity.other.attribute.$0.cuda-cpp"
      }, {
        include: "#number_literal"
      }]
    },
    curly_initializer: {
      begin: `(\\s*+((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:(?:unsigned)|(?:signed)|(?:short)|(?:long))|(?:(?:struct)|(?:class)|(?:union)|(?:enum)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<18>?)+>)(?:\\s)*+)?::)*+)?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?!(?:(?:transaction_safe_dynamic)|(?:__has_cpp_attribute)|(?:reinterpret_cast)|(?:transaction_safe)|(?:__forceinline__)|(?:atomic_noexcept)|(?:__has_include)|(?:atomic_cancel)|(?:atomic_commit)|(?:dynamic_cast)|(?:__constant__)|(?:__restrict__)|(?:__noinline__)|(?:thread_local)|(?:synchronized)|(?:static_cast)|(?:__managed__)|(?:const_cast)|(?:__shared__)|(?:__global__)|(?:__device__)|(?:co_return)|(?:constexpr)|(?:constexpr)|(?:constexpr)|(?:consteval)|(?:protected)|(?:threadIdx)|(?:namespace)|(?:co_return)|(?:noexcept)|(?:noexcept)|(?:continue)|(?:co_await)|(?:co_yield)|(?:volatile)|(?:register)|(?:restrict)|(?:explicit)|(?:__host__)|(?:override)|(?:volatile)|(?:noexcept)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:template)|(?:operator)|(?:decltype)|(?:typename)|(?:requires)|(?:co_await)|(?:co_yield)|(?:reflexpr)|(?:alignof)|(?:alignas)|(?:default)|(?:nullptr)|(?:mutable)|(?:virtual)|(?:mutable)|(?:private)|(?:include)|(?:warning)|(?:_Pragma)|(?:defined)|(?:gridDim)|(?:typedef)|(?:__asm__)|(?:concept)|(?:sizeof)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:typeid)|(?:switch)|(?:return)|(?:static)|(?:extern)|(?:inline)|(?:friend)|(?:public)|(?:ifndef)|(?:define)|(?:pragma)|(?:export)|(?:import)|(?:module)|(?:compl)|(?:bitor)|(?:throw)|(?:or_eq)|(?:while)|(?:catch)|(?:break)|(?:false)|(?:const)|(?:final)|(?:const)|(?:endif)|(?:ifdef)|(?:undef)|(?:error)|(?:using)|(?:audit)|(?:axiom)|(?:else)|(?:goto)|(?:case)|(?:NULL)|(?:true)|(?:elif)|(?:else)|(?:line)|(?:this)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:for)|(?:try)|(?:asm)|(?:or)|(?:do)|(?:if)|(?:if))\\b)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<18>?)+>)?(?![\\w<:.]))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\{)`,
      end: "\\}",
      beginCaptures: {
        1: {
          name: "meta.qualified_type.cuda-cpp",
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:(?:struct)|(?:class)|(?:union)|(?:enum))(?!\\w)",
            name: "storage.type.$0.cuda-cpp"
          }, {
            include: "#attributes_context"
          }, {
            include: "#storage_types"
          }, {
            include: "#number_literal"
          }, {
            include: "#string_context"
          }, {
            include: "#comma"
          }, {
            include: "#scope_resolution_inner_generated"
          }, {
            begin: "<",
            end: ">",
            beginCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
              }
            },
            name: "meta.template.call.cuda-cpp",
            patterns: [{
              include: "#template_call_context"
            }]
          }, {
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.type.cuda-cpp"
          }]
        },
        2: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        3: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        4: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        5: {
          name: "comment.block.cuda-cpp"
        },
        6: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        7: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        8: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        9: {
          name: "comment.block.cuda-cpp"
        },
        10: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        11: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.type.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.type.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        12: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        13: {},
        14: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        15: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        16: {
          name: "comment.block.cuda-cpp"
        },
        17: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        18: {},
        19: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        20: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        21: {
          name: "comment.block.cuda-cpp"
        },
        22: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        23: {
          name: "punctuation.section.arguments.begin.bracket.curly.initializer.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.arguments.end.bracket.curly.initializer.cuda-cpp"
        }
      },
      name: "meta.initialization.cuda-cpp",
      patterns: [{
        include: "#evaluation_context"
      }, {
        include: "#comma"
      }]
    },
    d9bc4796b0b_module_import: {
      match: '^((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((import))(?:(?:\\s)+)?(?:(?:(?:((<)[^>]*(>?)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:\\n)|$)|(?=\\/\\/)))|((\\")[^\\"]*((?:\\")?)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:\\n)|$)|(?=\\/\\/))))|(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?:\\.(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)*((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:\\n)|$)|(?=(?:\\/\\/|;)))))|((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:\\n)|$)|(?=(?:\\/\\/|;))))(?:(?:\\s)+)?(;?)',
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "keyword.control.directive.import.cuda-cpp"
        },
        5: {
          name: "string.quoted.other.lt-gt.include.cuda-cpp"
        },
        6: {
          name: "punctuation.definition.string.begin.cuda-cpp"
        },
        7: {
          name: "punctuation.definition.string.end.cuda-cpp"
        },
        8: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        9: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        10: {
          name: "string.quoted.double.include.cuda-cpp"
        },
        11: {
          name: "punctuation.definition.string.begin.cuda-cpp"
        },
        12: {
          name: "punctuation.definition.string.end.cuda-cpp"
        },
        13: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        14: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        15: {
          name: "entity.name.other.preprocessor.macro.include.cuda-cpp"
        },
        16: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        17: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        18: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        19: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        20: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        21: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        22: {
          name: "punctuation.terminator.statement.cuda-cpp"
        }
      },
      name: "meta.preprocessor.import.cuda-cpp"
    },
    d9bc4796b0b_preprocessor_number_literal: {
      match: "(?<!\\w)\\.?\\d(?:(?:[0-9a-zA-Z_\\.]|')|(?<=[eEpP])[+-])*",
      captures: {
        0: {
          patterns: [{
            begin: "(?=.)",
            end: "$",
            beginCaptures: {},
            endCaptures: {},
            patterns: [{
              match: "(\\G0[xX])([0-9a-fA-F](?:[0-9a-fA-F]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)?((?:(?<=[0-9a-fA-F])\\.|\\.(?=[0-9a-fA-F])))([0-9a-fA-F](?:[0-9a-fA-F]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)?(?:(?<!')([pP])((?:\\+)?)((?:\\-)?)([0-9](?:[0-9]|(?<=[0-9a-fA-F])'(?=[0-9a-fA-F]))*))?([lLfF](?!\\w))?$",
              captures: {
                1: {
                  name: "keyword.other.unit.hexadecimal.cuda-cpp"
                },
                2: {
                  name: "constant.numeric.hexadecimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                3: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                4: {
                  name: "constant.numeric.hexadecimal.cuda-cpp"
                },
                5: {
                  name: "constant.numeric.hexadecimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                6: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                7: {
                  name: "keyword.other.unit.exponent.hexadecimal.cuda-cpp"
                },
                8: {
                  name: "keyword.operator.plus.exponent.hexadecimal.cuda-cpp"
                },
                9: {
                  name: "keyword.operator.minus.exponent.hexadecimal.cuda-cpp"
                },
                10: {
                  name: "constant.numeric.exponent.hexadecimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                11: {
                  name: "keyword.other.unit.suffix.floating-point.cuda-cpp"
                }
              }
            }, {
              match: "\\G(?=[0-9.])(?!0[xXbB])([0-9](?:[0-9]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)?((?:(?<=[0-9])\\.|\\.(?=[0-9])))([0-9](?:[0-9]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)?(?:(?<!')([eE])((?:\\+)?)((?:\\-)?)([0-9](?:[0-9]|(?<=[0-9a-fA-F])'(?=[0-9a-fA-F]))*))?([lLfF](?!\\w))?$",
              captures: {
                1: {
                  name: "constant.numeric.decimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                2: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                3: {
                  name: "constant.numeric.decimal.point.cuda-cpp"
                },
                4: {
                  name: "constant.numeric.decimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                5: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                6: {
                  name: "keyword.other.unit.exponent.decimal.cuda-cpp"
                },
                7: {
                  name: "keyword.operator.plus.exponent.decimal.cuda-cpp"
                },
                8: {
                  name: "keyword.operator.minus.exponent.decimal.cuda-cpp"
                },
                9: {
                  name: "constant.numeric.exponent.decimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                10: {
                  name: "keyword.other.unit.suffix.floating-point.cuda-cpp"
                }
              }
            }, {
              match: "(\\G0[bB])([01](?:[01]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)((?:[uU]|(?:[uU]ll?)|(?:[uU]LL?)|(?:ll?[uU]?)|(?:LL?[uU]?)|[fF])(?!\\w))?$",
              captures: {
                1: {
                  name: "keyword.other.unit.binary.cuda-cpp"
                },
                2: {
                  name: "constant.numeric.binary.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                3: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                4: {
                  name: "keyword.other.unit.suffix.integer.cuda-cpp"
                }
              }
            }, {
              match: "(\\G0)((?:[0-7]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))+)((?:[uU]|(?:[uU]ll?)|(?:[uU]LL?)|(?:ll?[uU]?)|(?:LL?[uU]?)|[fF])(?!\\w))?$",
              captures: {
                1: {
                  name: "keyword.other.unit.octal.cuda-cpp"
                },
                2: {
                  name: "constant.numeric.octal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                3: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                4: {
                  name: "keyword.other.unit.suffix.integer.cuda-cpp"
                }
              }
            }, {
              match: "(\\G0[xX])([0-9a-fA-F](?:[0-9a-fA-F]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)(?:(?<!')([pP])((?:\\+)?)((?:\\-)?)([0-9](?:[0-9]|(?<=[0-9a-fA-F])'(?=[0-9a-fA-F]))*))?((?:[uU]|(?:[uU]ll?)|(?:[uU]LL?)|(?:ll?[uU]?)|(?:LL?[uU]?)|[fF])(?!\\w))?$",
              captures: {
                1: {
                  name: "keyword.other.unit.hexadecimal.cuda-cpp"
                },
                2: {
                  name: "constant.numeric.hexadecimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                3: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                4: {
                  name: "keyword.other.unit.exponent.hexadecimal.cuda-cpp"
                },
                5: {
                  name: "keyword.operator.plus.exponent.hexadecimal.cuda-cpp"
                },
                6: {
                  name: "keyword.operator.minus.exponent.hexadecimal.cuda-cpp"
                },
                7: {
                  name: "constant.numeric.exponent.hexadecimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                8: {
                  name: "keyword.other.unit.suffix.integer.cuda-cpp"
                }
              }
            }, {
              match: "\\G(?=[0-9.])(?!0[xXbB])([0-9](?:[0-9]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)(?:(?<!')([eE])((?:\\+)?)((?:\\-)?)([0-9](?:[0-9]|(?<=[0-9a-fA-F])'(?=[0-9a-fA-F]))*))?((?:[uU]|(?:[uU]ll?)|(?:[uU]LL?)|(?:ll?[uU]?)|(?:LL?[uU]?)|[fF])(?!\\w))?$",
              captures: {
                1: {
                  name: "constant.numeric.decimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                2: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                3: {
                  name: "keyword.other.unit.exponent.decimal.cuda-cpp"
                },
                4: {
                  name: "keyword.operator.plus.exponent.decimal.cuda-cpp"
                },
                5: {
                  name: "keyword.operator.minus.exponent.decimal.cuda-cpp"
                },
                6: {
                  name: "constant.numeric.exponent.decimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                7: {
                  name: "keyword.other.unit.suffix.integer.cuda-cpp"
                }
              }
            }, {
              match: "(?:(?:[0-9a-zA-Z_\\.]|')|(?<=[eEpP])[+-])+",
              name: "invalid.illegal.constant.numeric.cuda-cpp"
            }]
          }]
        }
      }
    },
    decltype: {
      begin: "((?<!\\w)decltype(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
      end: "\\)",
      beginCaptures: {
        1: {
          name: "keyword.operator.functionlike.cuda-cpp keyword.other.decltype.cuda-cpp storage.type.decltype.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        6: {
          name: "punctuation.section.arguments.begin.bracket.round.decltype.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.arguments.end.bracket.round.decltype.cuda-cpp"
        }
      },
      contentName: "meta.arguments.decltype",
      patterns: [{
        include: "#evaluation_context"
      }]
    },
    decltype_specifier: {
      begin: "((?<!\\w)decltype(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
      end: "\\)",
      beginCaptures: {
        1: {
          name: "keyword.operator.functionlike.cuda-cpp keyword.other.decltype.cuda-cpp storage.type.decltype.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        6: {
          name: "punctuation.section.arguments.begin.bracket.round.decltype.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.arguments.end.bracket.round.decltype.cuda-cpp"
        }
      },
      contentName: "meta.arguments.decltype",
      patterns: [{
        include: "#evaluation_context"
      }]
    },
    default_statement: {
      begin: "((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)default(?!\\w))",
      end: ":",
      beginCaptures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          name: "keyword.control.default.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.separator.colon.case.default.cuda-cpp"
        }
      },
      name: "meta.conditional.case.cuda-cpp",
      patterns: [{
        include: "#evaluation_context"
      }, {
        include: "#c_conditional_context"
      }]
    },
    destructor_inline: {
      begin: "^((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:__cdecl|__clrcall|__stdcall|__fastcall|__thiscall|__vectorcall)?)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:(?:(?:__forceinline__)|(?:__noinline__)|(?:__global__)|(?:__device__)|(?:constexpr)|(?:explicit)|(?:__host__)|(?:mutable)|(?:virtual)|(?:inline)|(?:friend))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*)(~(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)(?=\\())",
      end: "(?:(?<=\\}|%>|\\?\\?>)|(?=[;>\\[\\]=]))",
      beginCaptures: {
        0: {
          name: "meta.head.function.definition.special.member.destructor.cuda-cpp"
        },
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        6: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        7: {
          name: "comment.block.cuda-cpp"
        },
        8: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        9: {
          name: "storage.type.modifier.calling-convention.cuda-cpp"
        },
        10: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        11: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        12: {
          name: "comment.block.cuda-cpp"
        },
        13: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        14: {
          patterns: [{
            include: "#functional_specifiers_pre_parameters"
          }]
        },
        15: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        16: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        17: {
          name: "comment.block.cuda-cpp"
        },
        18: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        19: {
          name: "entity.name.function.destructor.cuda-cpp entity.name.function.definition.special.member.destructor.cuda-cpp"
        }
      },
      endCaptures: {},
      name: "meta.function.definition.special.member.destructor.cuda-cpp",
      patterns: [{
        begin: "\\G ?",
        end: "(?:\\{|<%|\\?\\?<|(?=;))",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.function.definition.special.member.destructor.cuda-cpp"
          }
        },
        name: "meta.head.function.definition.special.member.destructor.cuda-cpp",
        patterns: [{
          include: "#ever_present_context"
        }, {
          match: "(\\=)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(default)|(delete))",
          captures: {
            1: {
              name: "keyword.operator.assignment.cuda-cpp"
            },
            2: {
              patterns: [{
                include: "#inline_comment"
              }]
            },
            3: {
              name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
            },
            4: {
              name: "comment.block.cuda-cpp"
            },
            5: {
              patterns: [{
                match: "\\*\\/",
                name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
              }, {
                match: "\\*",
                name: "comment.block.cuda-cpp"
              }]
            },
            6: {
              name: "keyword.other.default.constructor.cuda-cpp"
            },
            7: {
              name: "keyword.other.delete.constructor.cuda-cpp"
            }
          }
        }, {
          begin: "\\(",
          end: "\\)",
          beginCaptures: {
            0: {
              name: "punctuation.section.parameters.begin.bracket.round.special.member.destructor.cuda-cpp"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.section.parameters.end.bracket.round.special.member.destructor.cuda-cpp"
            }
          },
          contentName: "meta.function.definition.parameters.special.member.destructor",
          patterns: []
        }, {
          match: "((?:(?:final)|(?:override)))+",
          captures: {
            1: {
              name: "keyword.operator.wordlike.cuda-cpp keyword.operator.$1.cuda-cpp"
            }
          }
        }, {
          include: "$self"
        }]
      }, {
        begin: "(?<=\\{|<%|\\?\\?<)",
        end: "\\}|%>|\\?\\?>",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.function.definition.special.member.destructor.cuda-cpp"
          }
        },
        name: "meta.body.function.definition.special.member.destructor.cuda-cpp",
        patterns: [{
          include: "#function_body_context"
        }]
      }, {
        begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
        end: "[\\s]*(?=;)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.tail.function.definition.special.member.destructor.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }]
    },
    destructor_root: {
      begin: `((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:__cdecl|__clrcall|__stdcall|__fastcall|__thiscall|__vectorcall)?)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<12>?)+>)(?:\\s)*+)?::)*+)(((?>(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))::((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))~\\14((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\())`,
      end: "(?:(?<=\\}|%>|\\?\\?>)|(?=[;>\\[\\]=]))",
      beginCaptures: {
        0: {
          name: "meta.head.function.definition.special.member.destructor.cuda-cpp"
        },
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          name: "storage.type.modifier.calling-convention.cuda-cpp"
        },
        6: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        7: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        8: {
          name: "comment.block.cuda-cpp"
        },
        9: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        10: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.destructor.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.destructor.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        11: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        12: {},
        13: {
          patterns: [{
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?=:)",
            name: "entity.name.type.destructor.cuda-cpp"
          }, {
            match: "(?<=:)~(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.function.definition.special.member.destructor.cuda-cpp"
          }, {
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.destructor.cuda-cpp"
          }]
        },
        14: {},
        15: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        16: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        17: {
          name: "comment.block.cuda-cpp"
        },
        18: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        19: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        20: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        21: {
          name: "comment.block.cuda-cpp"
        },
        22: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        23: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        24: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        25: {
          name: "comment.block.cuda-cpp"
        },
        26: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        }
      },
      endCaptures: {},
      name: "meta.function.definition.special.member.destructor.cuda-cpp",
      patterns: [{
        begin: "\\G ?",
        end: "(?:\\{|<%|\\?\\?<|(?=;))",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.function.definition.special.member.destructor.cuda-cpp"
          }
        },
        name: "meta.head.function.definition.special.member.destructor.cuda-cpp",
        patterns: [{
          include: "#ever_present_context"
        }, {
          match: "(\\=)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(default)|(delete))",
          captures: {
            1: {
              name: "keyword.operator.assignment.cuda-cpp"
            },
            2: {
              patterns: [{
                include: "#inline_comment"
              }]
            },
            3: {
              name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
            },
            4: {
              name: "comment.block.cuda-cpp"
            },
            5: {
              patterns: [{
                match: "\\*\\/",
                name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
              }, {
                match: "\\*",
                name: "comment.block.cuda-cpp"
              }]
            },
            6: {
              name: "keyword.other.default.constructor.cuda-cpp"
            },
            7: {
              name: "keyword.other.delete.constructor.cuda-cpp"
            }
          }
        }, {
          begin: "\\(",
          end: "\\)",
          beginCaptures: {
            0: {
              name: "punctuation.section.parameters.begin.bracket.round.special.member.destructor.cuda-cpp"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.section.parameters.end.bracket.round.special.member.destructor.cuda-cpp"
            }
          },
          contentName: "meta.function.definition.parameters.special.member.destructor",
          patterns: []
        }, {
          match: "((?:(?:final)|(?:override)))+",
          captures: {
            1: {
              name: "keyword.operator.wordlike.cuda-cpp keyword.operator.$1.cuda-cpp"
            }
          }
        }, {
          include: "$self"
        }]
      }, {
        begin: "(?<=\\{|<%|\\?\\?<)",
        end: "\\}|%>|\\?\\?>",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.function.definition.special.member.destructor.cuda-cpp"
          }
        },
        name: "meta.body.function.definition.special.member.destructor.cuda-cpp",
        patterns: [{
          include: "#function_body_context"
        }]
      }, {
        begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
        end: "[\\s]*(?=;)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.tail.function.definition.special.member.destructor.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }]
    },
    diagnostic: {
      begin: "(^((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(#)(?:(?:\\s)+)?((?:error|warning)))\\b(?:(?:\\s)+)?",
      end: "(?<!\\\\)(?=\\n)",
      beginCaptures: {
        1: {
          name: "keyword.control.directive.diagnostic.$7.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        6: {
          name: "punctuation.definition.directive.cuda-cpp"
        },
        7: {}
      },
      endCaptures: {},
      name: "meta.preprocessor.diagnostic.$reference(directive).cuda-cpp",
      patterns: [{
        begin: '"',
        end: '(?:(")|(?<!\\\\)(?=\\n))',
        beginCaptures: {
          0: {
            name: "punctuation.definition.string.begin.cuda-cpp"
          }
        },
        endCaptures: {
          1: {
            name: "punctuation.definition.string.end.cuda-cpp"
          }
        },
        name: "string.quoted.double.cuda-cpp",
        patterns: [{
          include: "#line_continuation_character"
        }]
      }, {
        begin: "'",
        end: "(?:(')|(?<!\\\\)(?=\\n))",
        beginCaptures: {
          0: {
            name: "punctuation.definition.string.begin.cuda-cpp"
          }
        },
        endCaptures: {
          1: {
            name: "punctuation.definition.string.end.cuda-cpp"
          }
        },
        name: "string.quoted.single.cuda-cpp",
        patterns: [{
          include: "#line_continuation_character"
        }]
      }, {
        begin: `[^'"]`,
        end: "(?<!\\\\)(?=\\n)",
        beginCaptures: {},
        endCaptures: {},
        name: "string.unquoted.cuda-cpp",
        patterns: [{
          include: "#line_continuation_character"
        }, {
          include: "#comments"
        }]
      }]
    },
    emacs_file_banner: {
      match: "(?:(^(?:(?:\\s)+)?((\\/\\/)(?:(?:\\s)+)?((?:[#;\\/=*C~]+)++(?![#;\\/=*C~]))(?:(?:\\s)+)?.+(?:(?:\\s)+)?\\4(?:(?:\\s)+)?(?:\\n|$)))|(^(?:(?:\\s)+)?((\\/\\*)(?:(?:\\s)+)?((?:[#;\\/=*C~]+)++(?![#;\\/=*C~]))(?:(?:\\s)+)?.+(?:(?:\\s)+)?\\8(?:(?:\\s)+)?\\*\\/)))",
      captures: {
        1: {
          name: "meta.toc-list.banner.double-slash.cuda-cpp"
        },
        2: {
          name: "comment.line.double-slash.cuda-cpp"
        },
        3: {
          name: "punctuation.definition.comment.cuda-cpp"
        },
        4: {
          name: "meta.banner.character.cuda-cpp"
        },
        5: {
          name: "meta.toc-list.banner.block.cuda-cpp"
        },
        6: {
          name: "comment.line.banner.cuda-cpp"
        },
        7: {
          name: "punctuation.definition.comment.cuda-cpp"
        },
        8: {
          name: "meta.banner.character.cuda-cpp"
        }
      }
    },
    empty_square_brackets: {
      name: "storage.modifier.array.bracket.square",
      match: "(?<!delete)\\[(?:(?:\\s)+)?\\]"
    },
    enum_block: {
      begin: `((?<!\\w)enum(?!\\w))(?:(?:\\s)+(class|struct))?(?:(?:(?:\\s)+|((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\))))|(?={))(?:(?:\\s)+)?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))?)(?:(?:(?:\\s)+)?(:)(?:(?:\\s)+)?(?:((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<12>?)+>)(?:\\s)*+)?::)*\\s*+)((?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<12>?)+>)(?:\\s)*+)?(::))?(?:(?:\\s)+)?((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)))?`,
      end: "(?:(?:(?<=\\}|%>|\\?\\?>)(?:(?:\\s)+)?(;)|(;))|(?=[;>\\[\\]=]))",
      beginCaptures: {
        0: {
          name: "meta.head.enum.cuda-cpp"
        },
        1: {
          name: "storage.type.enum.cuda-cpp"
        },
        2: {
          name: "storage.type.enum.enum-key.$2.cuda-cpp"
        },
        3: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        4: {
          name: "entity.name.type.enum.cuda-cpp"
        },
        5: {
          name: "punctuation.separator.colon.type-specifier.cuda-cpp"
        },
        6: {
          patterns: [{
            include: "#scope_resolution_inner_generated"
          }]
        },
        7: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
        },
        8: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        9: {},
        10: {
          name: "entity.name.scope-resolution.cuda-cpp"
        },
        11: {
          name: "meta.template.call.cuda-cpp",
          patterns: [{
            include: "#template_call_range"
          }]
        },
        12: {},
        13: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
        },
        14: {
          name: "storage.type.integral.$14.cuda-cpp"
        }
      },
      endCaptures: {
        1: {
          name: "punctuation.terminator.statement.cuda-cpp"
        },
        2: {
          name: "punctuation.terminator.statement.cuda-cpp"
        }
      },
      name: "meta.block.enum.cuda-cpp",
      patterns: [{
        begin: "\\G ?",
        end: "(?:\\{|<%|\\?\\?<|(?=;))",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.enum.cuda-cpp"
          }
        },
        name: "meta.head.enum.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }, {
        begin: "(?<=\\{|<%|\\?\\?<)",
        end: "\\}|%>|\\?\\?>",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.enum.cuda-cpp"
          }
        },
        name: "meta.body.enum.cuda-cpp",
        patterns: [{
          include: "#ever_present_context"
        }, {
          include: "#enumerator_list"
        }, {
          include: "#comments"
        }, {
          include: "#comma"
        }, {
          include: "#semicolon"
        }]
      }, {
        begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
        end: "[\\s]*(?=;)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.tail.enum.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }]
    },
    enum_declare: {
      match: "((?<!\\w)enum(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\b(?!override\\W|override\\$|final\\W|final\\$)((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\S)(?![:{a-zA-Z])",
      captures: {
        1: {
          name: "storage.type.enum.declare.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        4: {
          name: "entity.name.type.enum.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        6: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        7: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        8: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        9: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        10: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        11: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        12: {
          name: "variable.other.object.declare.cuda-cpp"
        },
        13: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        14: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      }
    },
    enumerator_list: {
      match: "((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(?:(?:\\s)+)?((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?(?:(?:\\s)+)?(?:(\\=)(?:(?:\\s)+)?(.+?)(?:(?:\\s)+)?)?(?:(?:((?:[,;](?!')|\\n))|(?=\\}[^']))|(?=(?:\\/\\/|\\/\\*)))",
      captures: {
        1: {
          name: "variable.other.enummember.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        3: {
          name: "keyword.operator.assignment.cuda-cpp"
        },
        4: {
          patterns: [{
            include: "#evaluation_context"
          }]
        },
        5: {
          patterns: [{
            include: "#comma"
          }, {
            include: "#semicolon"
          }]
        }
      },
      name: "meta.enum.definition.cuda-cpp"
    },
    evaluation_context: {
      patterns: [{
        include: "#ever_present_context"
      }, {
        include: "#string_context"
      }, {
        include: "#number_literal"
      }, {
        include: "#method_access"
      }, {
        include: "#member_access"
      }, {
        include: "#predefined_macros"
      }, {
        include: "#operators"
      }, {
        include: "#memory_operators"
      }, {
        include: "#wordlike_operators"
      }, {
        include: "#type_casting_operators"
      }, {
        include: "#control_flow_keywords"
      }, {
        include: "#exception_keywords"
      }, {
        include: "#the_this_keyword"
      }, {
        include: "#language_constants"
      }, {
        include: "#builtin_storage_type_initilizer"
      }, {
        include: "#qualifiers_and_specifiers_post_parameters"
      }, {
        include: "#functional_specifiers_pre_parameters"
      }, {
        include: "#storage_types"
      }, {
        include: "#lambdas"
      }, {
        include: "#attributes_context"
      }, {
        include: "#parentheses"
      }, {
        include: "#function_call"
      }, {
        include: "#scope_resolution_inner_generated"
      }, {
        include: "#square_brackets"
      }, {
        include: "#semicolon"
      }, {
        include: "#comma"
      }]
    },
    ever_present_context: {
      patterns: [{
        include: "#pragma_mark"
      }, {
        include: "#pragma"
      }, {
        include: "#include"
      }, {
        include: "#line"
      }, {
        include: "#diagnostic"
      }, {
        include: "#undef"
      }, {
        include: "#preprocessor_conditional_range"
      }, {
        include: "#single_line_macro"
      }, {
        include: "#macro"
      }, {
        include: "#preprocessor_conditional_standalone"
      }, {
        include: "#macro_argument"
      }, {
        include: "#comments"
      }, {
        include: "#line_continuation_character"
      }]
    },
    exception_keywords: {
      match: "((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:(?:throw)|(?:catch)|(?:try))(?!\\w))",
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "keyword.control.exception.$3.cuda-cpp"
        }
      }
    },
    extern_block: {
      begin: '((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(extern)(?=\\s*\\")',
      end: "(?:(?:(?<=\\}|%>|\\?\\?>)(?:(?:\\s)+)?(;)|(;))|(?=[;>\\[\\]=]))",
      beginCaptures: {
        0: {
          name: "meta.head.extern.cuda-cpp"
        },
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          name: "storage.type.extern.cuda-cpp"
        }
      },
      endCaptures: {
        1: {
          name: "punctuation.terminator.statement.cuda-cpp"
        },
        2: {
          name: "punctuation.terminator.statement.cuda-cpp"
        }
      },
      name: "meta.block.extern.cuda-cpp",
      patterns: [{
        begin: "\\G ?",
        end: "(?:\\{|<%|\\?\\?<|(?=;))",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.extern.cuda-cpp"
          }
        },
        name: "meta.head.extern.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }, {
        begin: "(?<=\\{|<%|\\?\\?<)",
        end: "\\}|%>|\\?\\?>",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.extern.cuda-cpp"
          }
        },
        name: "meta.body.extern.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }, {
        begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
        end: "[\\s]*(?=;)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.tail.extern.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }, {
        include: "$self"
      }]
    },
    function_body_context: {
      patterns: [{
        include: "#ever_present_context"
      }, {
        include: "#using_namespace"
      }, {
        include: "#type_alias"
      }, {
        include: "#using_name"
      }, {
        include: "#namespace_alias"
      }, {
        include: "#typedef_class"
      }, {
        include: "#typedef_struct"
      }, {
        include: "#typedef_union"
      }, {
        include: "#misc_keywords"
      }, {
        include: "#standard_declares"
      }, {
        include: "#class_block"
      }, {
        include: "#struct_block"
      }, {
        include: "#union_block"
      }, {
        include: "#enum_block"
      }, {
        include: "#access_control_keywords"
      }, {
        include: "#block"
      }, {
        include: "#static_assert"
      }, {
        include: "#assembly"
      }, {
        include: "#function_pointer"
      }, {
        include: "#switch_statement"
      }, {
        include: "#goto_statement"
      }, {
        include: "#evaluation_context"
      }, {
        include: "#label"
      }]
    },
    function_call: {
      begin: `((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<11>?)+>)(?:\\s)*+)?::)*\\s*+)((?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)\\b(?<!\\Wreinterpret_cast|^reinterpret_cast|\\W__forceinline__|^__forceinline__|\\Watomic_noexcept|^atomic_noexcept|\\Wuint_least16_t|^uint_least16_t|\\Wuint_least32_t|^uint_least32_t|\\Wuint_least64_t|^uint_least64_t|\\Wint_least16_t|^int_least16_t|\\Wint_least32_t|^int_least32_t|\\Wint_least64_t|^int_least64_t|\\Wuint_least8_t|^uint_least8_t|\\Wuint_fast16_t|^uint_fast16_t|\\Wuint_fast32_t|^uint_fast32_t|\\Wuint_fast64_t|^uint_fast64_t|\\Watomic_cancel|^atomic_cancel|\\Watomic_commit|^atomic_commit|\\Wdynamic_cast|^dynamic_cast|\\Wint_least8_t|^int_least8_t|\\Wint_fast16_t|^int_fast16_t|\\Wint_fast32_t|^int_fast32_t|\\Wint_fast64_t|^int_fast64_t|\\Wuint_fast8_t|^uint_fast8_t|\\W__constant__|^__constant__|\\W__restrict__|^__restrict__|\\W__noinline__|^__noinline__|\\Wthread_local|^thread_local|\\Wsynchronized|^synchronized|\\Wstatic_cast|^static_cast|\\Wsuseconds_t|^suseconds_t|\\Wint_fast8_t|^int_fast8_t|\\W__managed__|^__managed__|\\Wconst_cast|^const_cast|\\Wuseconds_t|^useconds_t|\\Wulonglong1|^ulonglong1|\\Wulonglong2|^ulonglong2|\\Wulonglong3|^ulonglong3|\\Wulonglong4|^ulonglong4|\\W__shared__|^__shared__|\\W__global__|^__global__|\\W__device__|^__device__|\\Wco_return|^co_return|\\Wblksize_t|^blksize_t|\\Win_addr_t|^in_addr_t|\\Win_port_t|^in_port_t|\\Wuintptr_t|^uintptr_t|\\Wuintmax_t|^uintmax_t|\\Wuintmax_t|^uintmax_t|\\Wuintmax_t|^uintmax_t|\\Wlonglong1|^longlong1|\\Wlonglong2|^longlong2|\\Wlonglong3|^longlong3|\\Wlonglong4|^longlong4|\\Wconstexpr|^constexpr|\\Wconstexpr|^constexpr|\\Wconstexpr|^constexpr|\\Wconsteval|^consteval|\\Wprotected|^protected|\\WthreadIdx|^threadIdx|\\Wnamespace|^namespace|\\Wco_return|^co_return|\\Wnoexcept|^noexcept|\\Wnoexcept|^noexcept|\\Wcontinue|^continue|\\Wco_await|^co_await|\\Wco_yield|^co_yield|\\Wunsigned|^unsigned|\\Wu_quad_t|^u_quad_t|\\Wblkcnt_t|^blkcnt_t|\\Wuint16_t|^uint16_t|\\Wuint32_t|^uint32_t|\\Wuint64_t|^uint64_t|\\Wintptr_t|^intptr_t|\\Wintmax_t|^intmax_t|\\Wintmax_t|^intmax_t|\\Wvolatile|^volatile|\\Wregister|^register|\\Wrestrict|^restrict|\\Wexplicit|^explicit|\\W__host__|^__host__|\\Wvolatile|^volatile|\\Wnoexcept|^noexcept|\\WblockIdx|^blockIdx|\\WblockDim|^blockDim|\\WwarpSize|^warpSize|\\Wtemplate|^template|\\Woperator|^operator|\\Wdecltype|^decltype|\\Wtypename|^typename|\\Wrequires|^requires|\\Wco_await|^co_await|\\Wco_yield|^co_yield|\\Wreflexpr|^reflexpr|\\Walignof|^alignof|\\Walignas|^alignas|\\Wdefault|^default|\\Wwchar_t|^wchar_t|\\Wu_short|^u_short|\\Wqaddr_t|^qaddr_t|\\Wcaddr_t|^caddr_t|\\Wdaddr_t|^daddr_t|\\Wfixpt_t|^fixpt_t|\\Wnlink_t|^nlink_t|\\Wsegsz_t|^segsz_t|\\Wswblk_t|^swblk_t|\\Wclock_t|^clock_t|\\Wssize_t|^ssize_t|\\Wint16_t|^int16_t|\\Wint32_t|^int32_t|\\Wint64_t|^int64_t|\\Wuint8_t|^uint8_t|\\Wushort1|^ushort1|\\Wushort2|^ushort2|\\Wushort3|^ushort3|\\Wushort4|^ushort4|\\Wdouble1|^double1|\\Wdouble2|^double2|\\Wdouble3|^double3|\\Wdouble4|^double4|\\Wnullptr|^nullptr|\\Wmutable|^mutable|\\Wvirtual|^virtual|\\Wmutable|^mutable|\\Wprivate|^private|\\WgridDim|^gridDim|\\Wtypedef|^typedef|\\W__asm__|^__asm__|\\Wconcept|^concept|\\Wsizeof|^sizeof|\\Wdelete|^delete|\\Wnot_eq|^not_eq|\\Wbitand|^bitand|\\Wand_eq|^and_eq|\\Wxor_eq|^xor_eq|\\Wtypeid|^typeid|\\Wswitch|^switch|\\Wreturn|^return|\\Wsigned|^signed|\\Wdouble|^double|\\Wu_char|^u_char|\\Wu_long|^u_long|\\Wushort|^ushort|\\Wquad_t|^quad_t|\\Wmode_t|^mode_t|\\Wsize_t|^size_t|\\Wtime_t|^time_t|\\Wint8_t|^int8_t|\\Wuchar1|^uchar1|\\Wuchar2|^uchar2|\\Wuchar3|^uchar3|\\Wuchar4|^uchar4|\\Wshort1|^short1|\\Wshort2|^short2|\\Wshort3|^short3|\\Wshort4|^short4|\\Wulong4|^ulong4|\\Wulong1|^ulong1|\\Wulong2|^ulong2|\\Wulong3|^ulong3|\\Wulong4|^ulong4|\\Wfloat1|^float1|\\Wfloat2|^float2|\\Wfloat3|^float3|\\Wfloat4|^float4|\\Wstruct|^struct|\\Wstatic|^static|\\Wextern|^extern|\\Winline|^inline|\\Wfriend|^friend|\\Wpublic|^public|\\Wexport|^export|\\Wimport|^import|\\Wmodule|^module|\\Wcompl|^compl|\\Wbitor|^bitor|\\Wthrow|^throw|\\Wor_eq|^or_eq|\\Wwhile|^while|\\Wcatch|^catch|\\Wbreak|^break|\\Wshort|^short|\\Wfloat|^float|\\Wu_int|^u_int|\\Wdiv_t|^div_t|\\Wdev_t|^dev_t|\\Wgid_t|^gid_t|\\Wino_t|^ino_t|\\Wkey_t|^key_t|\\Wpid_t|^pid_t|\\Woff_t|^off_t|\\Wuid_t|^uid_t|\\Wchar1|^char1|\\Wchar2|^char2|\\Wchar3|^char3|\\Wchar4|^char4|\\Wuint1|^uint1|\\Wuint2|^uint2|\\Wuint3|^uint3|\\Wuint4|^uint4|\\Wlong1|^long1|\\Wlong2|^long2|\\Wlong3|^long3|\\Wfalse|^false|\\Wclass|^class|\\Wunion|^union|\\Wconst|^const|\\Wconst|^const|\\Wusing|^using|\\Welse|^else|\\Wgoto|^goto|\\Wcase|^case|\\Wauto|^auto|\\Wvoid|^void|\\Wchar|^char|\\Wlong|^long|\\Wbool|^bool|\\Wuint|^uint|\\Wid_t|^id_t|\\Wid_t|^id_t|\\Wint1|^int1|\\Wint2|^int2|\\Wint3|^int3|\\Wint4|^int4|\\Wdim3|^dim3|\\WNULL|^NULL|\\Wtrue|^true|\\Wenum|^enum|\\Wthis|^this|\\Wnot|^not|\\Wnew|^new|\\Wxor|^xor|\\Wand|^and|\\Wfor|^for|\\Wtry|^try|\\Wint|^int|\\Wasm|^asm|\\Wor|^or|\\Wdo|^do|\\Wif|^if)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<11>?)+>)(?:\\s)*+)?(\\()`,
      end: "\\)",
      beginCaptures: {
        1: {
          patterns: [{
            include: "#scope_resolution_function_call_inner_generated"
          }]
        },
        2: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.function.call.cuda-cpp"
        },
        3: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        4: {},
        5: {
          name: "entity.name.function.call.cuda-cpp"
        },
        6: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        7: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        8: {
          name: "comment.block.cuda-cpp"
        },
        9: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        10: {
          name: "meta.template.call.cuda-cpp",
          patterns: [{
            include: "#template_call_range"
          }]
        },
        11: {},
        12: {
          name: "punctuation.section.arguments.begin.bracket.round.function.call.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.arguments.end.bracket.round.function.call.cuda-cpp"
        }
      },
      patterns: [{
        include: "#evaluation_context"
      }]
    },
    function_definition: {
      begin: `(?:(?:^|\\G|(?<=;|\\}))|(?<=>))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:((?<!\\w)template(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:((?<!\\w)(?:(?:(?:__forceinline__)|(?:__noinline__)|(?:__global__)|(?:__device__)|(?:constexpr)|(?:explicit)|(?:__host__)|(?:mutable)|(?:virtual)|(?:inline)|(?:friend))|(?:(?:__constant__)|(?:__restrict__)|(?:__managed__)|(?:__shared__)|(?:volatile)|(?:register)|(?:restrict)|(?:static)|(?:extern)|(?:const)))(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*)(\\s*+((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:(?:unsigned)|(?:signed)|(?:short)|(?:long))|(?:(?:struct)|(?:class)|(?:union)|(?:enum)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<60>?)+>)(?:\\s)*+)?::)*+)?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?!(?:(?:transaction_safe_dynamic)|(?:__has_cpp_attribute)|(?:reinterpret_cast)|(?:transaction_safe)|(?:__forceinline__)|(?:atomic_noexcept)|(?:__has_include)|(?:atomic_cancel)|(?:atomic_commit)|(?:dynamic_cast)|(?:__constant__)|(?:__restrict__)|(?:__noinline__)|(?:thread_local)|(?:synchronized)|(?:static_cast)|(?:__managed__)|(?:const_cast)|(?:__shared__)|(?:__global__)|(?:__device__)|(?:co_return)|(?:constexpr)|(?:constexpr)|(?:constexpr)|(?:consteval)|(?:protected)|(?:threadIdx)|(?:namespace)|(?:co_return)|(?:noexcept)|(?:noexcept)|(?:continue)|(?:co_await)|(?:co_yield)|(?:volatile)|(?:register)|(?:restrict)|(?:explicit)|(?:__host__)|(?:override)|(?:volatile)|(?:noexcept)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:template)|(?:operator)|(?:decltype)|(?:typename)|(?:requires)|(?:co_await)|(?:co_yield)|(?:reflexpr)|(?:alignof)|(?:alignas)|(?:default)|(?:nullptr)|(?:mutable)|(?:virtual)|(?:mutable)|(?:private)|(?:include)|(?:warning)|(?:_Pragma)|(?:defined)|(?:gridDim)|(?:typedef)|(?:__asm__)|(?:concept)|(?:sizeof)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:typeid)|(?:switch)|(?:return)|(?:static)|(?:extern)|(?:inline)|(?:friend)|(?:public)|(?:ifndef)|(?:define)|(?:pragma)|(?:export)|(?:import)|(?:module)|(?:compl)|(?:bitor)|(?:throw)|(?:or_eq)|(?:while)|(?:catch)|(?:break)|(?:false)|(?:const)|(?:final)|(?:const)|(?:endif)|(?:ifdef)|(?:undef)|(?:error)|(?:using)|(?:audit)|(?:axiom)|(?:else)|(?:goto)|(?:case)|(?:NULL)|(?:true)|(?:elif)|(?:else)|(?:line)|(?:this)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:for)|(?:try)|(?:asm)|(?:or)|(?:do)|(?:if)|(?:if))\\b)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<60>?)+>)?(?![\\w<:.]))(((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:__cdecl|__clrcall|__stdcall|__fastcall|__thiscall|__vectorcall)?)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<60>?)+>)(?:\\s)*+)?::)*\\s*+)((?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)\\b(?<!\\Wreinterpret_cast|^reinterpret_cast|\\W__forceinline__|^__forceinline__|\\Watomic_noexcept|^atomic_noexcept|\\Wuint_least16_t|^uint_least16_t|\\Wuint_least32_t|^uint_least32_t|\\Wuint_least64_t|^uint_least64_t|\\Wint_least16_t|^int_least16_t|\\Wint_least32_t|^int_least32_t|\\Wint_least64_t|^int_least64_t|\\Wuint_least8_t|^uint_least8_t|\\Wuint_fast16_t|^uint_fast16_t|\\Wuint_fast32_t|^uint_fast32_t|\\Wuint_fast64_t|^uint_fast64_t|\\Watomic_cancel|^atomic_cancel|\\Watomic_commit|^atomic_commit|\\Wdynamic_cast|^dynamic_cast|\\Wint_least8_t|^int_least8_t|\\Wint_fast16_t|^int_fast16_t|\\Wint_fast32_t|^int_fast32_t|\\Wint_fast64_t|^int_fast64_t|\\Wuint_fast8_t|^uint_fast8_t|\\W__constant__|^__constant__|\\W__restrict__|^__restrict__|\\W__noinline__|^__noinline__|\\Wthread_local|^thread_local|\\Wsynchronized|^synchronized|\\Wstatic_cast|^static_cast|\\Wsuseconds_t|^suseconds_t|\\Wint_fast8_t|^int_fast8_t|\\W__managed__|^__managed__|\\Wconst_cast|^const_cast|\\Wuseconds_t|^useconds_t|\\Wulonglong1|^ulonglong1|\\Wulonglong2|^ulonglong2|\\Wulonglong3|^ulonglong3|\\Wulonglong4|^ulonglong4|\\W__shared__|^__shared__|\\W__global__|^__global__|\\W__device__|^__device__|\\Wco_return|^co_return|\\Wblksize_t|^blksize_t|\\Win_addr_t|^in_addr_t|\\Win_port_t|^in_port_t|\\Wuintptr_t|^uintptr_t|\\Wuintmax_t|^uintmax_t|\\Wuintmax_t|^uintmax_t|\\Wuintmax_t|^uintmax_t|\\Wlonglong1|^longlong1|\\Wlonglong2|^longlong2|\\Wlonglong3|^longlong3|\\Wlonglong4|^longlong4|\\Wconstexpr|^constexpr|\\Wconstexpr|^constexpr|\\Wconstexpr|^constexpr|\\Wconsteval|^consteval|\\Wprotected|^protected|\\WthreadIdx|^threadIdx|\\Wnamespace|^namespace|\\Wco_return|^co_return|\\Wnoexcept|^noexcept|\\Wnoexcept|^noexcept|\\Wcontinue|^continue|\\Wco_await|^co_await|\\Wco_yield|^co_yield|\\Wunsigned|^unsigned|\\Wu_quad_t|^u_quad_t|\\Wblkcnt_t|^blkcnt_t|\\Wuint16_t|^uint16_t|\\Wuint32_t|^uint32_t|\\Wuint64_t|^uint64_t|\\Wintptr_t|^intptr_t|\\Wintmax_t|^intmax_t|\\Wintmax_t|^intmax_t|\\Wvolatile|^volatile|\\Wregister|^register|\\Wrestrict|^restrict|\\Wexplicit|^explicit|\\W__host__|^__host__|\\Wvolatile|^volatile|\\Wnoexcept|^noexcept|\\WblockIdx|^blockIdx|\\WblockDim|^blockDim|\\WwarpSize|^warpSize|\\Wtemplate|^template|\\Woperator|^operator|\\Wdecltype|^decltype|\\Wtypename|^typename|\\Wrequires|^requires|\\Wco_await|^co_await|\\Wco_yield|^co_yield|\\Wreflexpr|^reflexpr|\\Walignof|^alignof|\\Walignas|^alignas|\\Wdefault|^default|\\Wwchar_t|^wchar_t|\\Wu_short|^u_short|\\Wqaddr_t|^qaddr_t|\\Wcaddr_t|^caddr_t|\\Wdaddr_t|^daddr_t|\\Wfixpt_t|^fixpt_t|\\Wnlink_t|^nlink_t|\\Wsegsz_t|^segsz_t|\\Wswblk_t|^swblk_t|\\Wclock_t|^clock_t|\\Wssize_t|^ssize_t|\\Wint16_t|^int16_t|\\Wint32_t|^int32_t|\\Wint64_t|^int64_t|\\Wuint8_t|^uint8_t|\\Wushort1|^ushort1|\\Wushort2|^ushort2|\\Wushort3|^ushort3|\\Wushort4|^ushort4|\\Wdouble1|^double1|\\Wdouble2|^double2|\\Wdouble3|^double3|\\Wdouble4|^double4|\\Wnullptr|^nullptr|\\Wmutable|^mutable|\\Wvirtual|^virtual|\\Wmutable|^mutable|\\Wprivate|^private|\\WgridDim|^gridDim|\\Wtypedef|^typedef|\\W__asm__|^__asm__|\\Wconcept|^concept|\\Wsizeof|^sizeof|\\Wdelete|^delete|\\Wnot_eq|^not_eq|\\Wbitand|^bitand|\\Wand_eq|^and_eq|\\Wxor_eq|^xor_eq|\\Wtypeid|^typeid|\\Wswitch|^switch|\\Wreturn|^return|\\Wsigned|^signed|\\Wdouble|^double|\\Wu_char|^u_char|\\Wu_long|^u_long|\\Wushort|^ushort|\\Wquad_t|^quad_t|\\Wmode_t|^mode_t|\\Wsize_t|^size_t|\\Wtime_t|^time_t|\\Wint8_t|^int8_t|\\Wuchar1|^uchar1|\\Wuchar2|^uchar2|\\Wuchar3|^uchar3|\\Wuchar4|^uchar4|\\Wshort1|^short1|\\Wshort2|^short2|\\Wshort3|^short3|\\Wshort4|^short4|\\Wulong4|^ulong4|\\Wulong1|^ulong1|\\Wulong2|^ulong2|\\Wulong3|^ulong3|\\Wulong4|^ulong4|\\Wfloat1|^float1|\\Wfloat2|^float2|\\Wfloat3|^float3|\\Wfloat4|^float4|\\Wstruct|^struct|\\Wstatic|^static|\\Wextern|^extern|\\Winline|^inline|\\Wfriend|^friend|\\Wpublic|^public|\\Wexport|^export|\\Wimport|^import|\\Wmodule|^module|\\Wcompl|^compl|\\Wbitor|^bitor|\\Wthrow|^throw|\\Wor_eq|^or_eq|\\Wwhile|^while|\\Wcatch|^catch|\\Wbreak|^break|\\Wshort|^short|\\Wfloat|^float|\\Wu_int|^u_int|\\Wdiv_t|^div_t|\\Wdev_t|^dev_t|\\Wgid_t|^gid_t|\\Wino_t|^ino_t|\\Wkey_t|^key_t|\\Wpid_t|^pid_t|\\Woff_t|^off_t|\\Wuid_t|^uid_t|\\Wchar1|^char1|\\Wchar2|^char2|\\Wchar3|^char3|\\Wchar4|^char4|\\Wuint1|^uint1|\\Wuint2|^uint2|\\Wuint3|^uint3|\\Wuint4|^uint4|\\Wlong1|^long1|\\Wlong2|^long2|\\Wlong3|^long3|\\Wfalse|^false|\\Wclass|^class|\\Wunion|^union|\\Wconst|^const|\\Wconst|^const|\\Wusing|^using|\\Welse|^else|\\Wgoto|^goto|\\Wcase|^case|\\Wauto|^auto|\\Wvoid|^void|\\Wchar|^char|\\Wlong|^long|\\Wbool|^bool|\\Wuint|^uint|\\Wid_t|^id_t|\\Wid_t|^id_t|\\Wint1|^int1|\\Wint2|^int2|\\Wint3|^int3|\\Wint4|^int4|\\Wdim3|^dim3|\\WNULL|^NULL|\\Wtrue|^true|\\Wenum|^enum|\\Wthis|^this|\\Wnot|^not|\\Wnew|^new|\\Wxor|^xor|\\Wand|^and|\\Wfor|^for|\\Wtry|^try|\\Wint|^int|\\Wasm|^asm|\\Wor|^or|\\Wdo|^do|\\Wif|^if)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\()`,
      end: "(?:(?<=\\}|%>|\\?\\?>)|(?=[;>\\[\\]=]))",
      beginCaptures: {
        0: {
          name: "meta.head.function.definition.cuda-cpp"
        },
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          name: "storage.type.template.cuda-cpp"
        },
        6: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        7: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        8: {
          name: "comment.block.cuda-cpp"
        },
        9: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        10: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        11: {
          patterns: [{
            match: "((?<!\\w)(?:(?:(?:__forceinline__)|(?:__noinline__)|(?:__global__)|(?:__device__)|(?:constexpr)|(?:explicit)|(?:__host__)|(?:mutable)|(?:virtual)|(?:inline)|(?:friend))|(?:(?:__constant__)|(?:__restrict__)|(?:__managed__)|(?:__shared__)|(?:volatile)|(?:register)|(?:restrict)|(?:static)|(?:extern)|(?:const)))(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))",
            captures: {
              1: {
                name: "storage.modifier.$1.cuda-cpp"
              },
              2: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              3: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              4: {
                name: "comment.block.cuda-cpp"
              },
              5: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        12: {
          name: "storage.modifier.$12.cuda-cpp"
        },
        13: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        14: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        15: {
          name: "comment.block.cuda-cpp"
        },
        16: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        17: {
          name: "meta.qualified_type.cuda-cpp",
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:(?:struct)|(?:class)|(?:union)|(?:enum))(?!\\w)",
            name: "storage.type.$0.cuda-cpp"
          }, {
            include: "#attributes_context"
          }, {
            include: "#storage_types"
          }, {
            include: "#number_literal"
          }, {
            include: "#string_context"
          }, {
            include: "#comma"
          }, {
            include: "#scope_resolution_inner_generated"
          }, {
            begin: "<",
            end: ">",
            beginCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
              }
            },
            name: "meta.template.call.cuda-cpp",
            patterns: [{
              include: "#template_call_context"
            }]
          }, {
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.type.cuda-cpp"
          }]
        },
        18: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        19: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        20: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        21: {
          name: "comment.block.cuda-cpp"
        },
        22: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        23: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        24: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        25: {
          name: "comment.block.cuda-cpp"
        },
        26: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        27: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.type.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.type.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        28: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        29: {},
        30: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        31: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        32: {
          name: "comment.block.cuda-cpp"
        },
        33: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        34: {},
        35: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        36: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        37: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        38: {
          name: "comment.block.cuda-cpp"
        },
        39: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        40: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        41: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        42: {
          name: "comment.block.cuda-cpp"
        },
        43: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        44: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        45: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        46: {
          name: "comment.block.cuda-cpp"
        },
        47: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        48: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        49: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        50: {
          name: "comment.block.cuda-cpp"
        },
        51: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        52: {
          name: "storage.type.modifier.calling-convention.cuda-cpp"
        },
        53: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        54: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        55: {
          name: "comment.block.cuda-cpp"
        },
        56: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        57: {
          patterns: [{
            include: "#scope_resolution_function_definition_inner_generated"
          }]
        },
        58: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.function.definition.cuda-cpp"
        },
        59: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        60: {},
        61: {
          name: "entity.name.function.definition.cuda-cpp"
        },
        62: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        63: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        64: {
          name: "comment.block.cuda-cpp"
        },
        65: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        }
      },
      endCaptures: {},
      name: "meta.function.definition.cuda-cpp",
      patterns: [{
        begin: "\\G ?",
        end: "(?:\\{|<%|\\?\\?<|(?=;))",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.function.definition.cuda-cpp"
          }
        },
        name: "meta.head.function.definition.cuda-cpp",
        patterns: [{
          include: "#ever_present_context"
        }, {
          begin: "\\(",
          end: "\\)",
          beginCaptures: {
            0: {
              name: "punctuation.section.parameters.begin.bracket.round.cuda-cpp"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.section.parameters.end.bracket.round.cuda-cpp"
            }
          },
          contentName: "meta.function.definition.parameters",
          patterns: [{
            include: "#ever_present_context"
          }, {
            include: "#parameter_or_maybe_value"
          }, {
            include: "#comma"
          }, {
            include: "#evaluation_context"
          }]
        }, {
          match: `(?<=^|\\))(?:(?:\\s)+)?(->)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\s*+((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:(?:unsigned)|(?:signed)|(?:short)|(?:long))|(?:(?:struct)|(?:class)|(?:union)|(?:enum)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<23>?)+>)(?:\\s)*+)?::)*+)?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?!(?:(?:transaction_safe_dynamic)|(?:__has_cpp_attribute)|(?:reinterpret_cast)|(?:transaction_safe)|(?:__forceinline__)|(?:atomic_noexcept)|(?:__has_include)|(?:atomic_cancel)|(?:atomic_commit)|(?:dynamic_cast)|(?:__constant__)|(?:__restrict__)|(?:__noinline__)|(?:thread_local)|(?:synchronized)|(?:static_cast)|(?:__managed__)|(?:const_cast)|(?:__shared__)|(?:__global__)|(?:__device__)|(?:co_return)|(?:constexpr)|(?:constexpr)|(?:constexpr)|(?:consteval)|(?:protected)|(?:threadIdx)|(?:namespace)|(?:co_return)|(?:noexcept)|(?:noexcept)|(?:continue)|(?:co_await)|(?:co_yield)|(?:volatile)|(?:register)|(?:restrict)|(?:explicit)|(?:__host__)|(?:override)|(?:volatile)|(?:noexcept)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:template)|(?:operator)|(?:decltype)|(?:typename)|(?:requires)|(?:co_await)|(?:co_yield)|(?:reflexpr)|(?:alignof)|(?:alignas)|(?:default)|(?:nullptr)|(?:mutable)|(?:virtual)|(?:mutable)|(?:private)|(?:include)|(?:warning)|(?:_Pragma)|(?:defined)|(?:gridDim)|(?:typedef)|(?:__asm__)|(?:concept)|(?:sizeof)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:typeid)|(?:switch)|(?:return)|(?:static)|(?:extern)|(?:inline)|(?:friend)|(?:public)|(?:ifndef)|(?:define)|(?:pragma)|(?:export)|(?:import)|(?:module)|(?:compl)|(?:bitor)|(?:throw)|(?:or_eq)|(?:while)|(?:catch)|(?:break)|(?:false)|(?:const)|(?:final)|(?:const)|(?:endif)|(?:ifdef)|(?:undef)|(?:error)|(?:using)|(?:audit)|(?:axiom)|(?:else)|(?:goto)|(?:case)|(?:NULL)|(?:true)|(?:elif)|(?:else)|(?:line)|(?:this)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:for)|(?:try)|(?:asm)|(?:or)|(?:do)|(?:if)|(?:if))\\b)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<23>?)+>)?(?![\\w<:.]))`,
          captures: {
            1: {
              name: "punctuation.definition.function.return-type.cuda-cpp"
            },
            2: {
              patterns: [{
                include: "#inline_comment"
              }]
            },
            3: {
              name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
            },
            4: {
              name: "comment.block.cuda-cpp"
            },
            5: {
              patterns: [{
                match: "\\*\\/",
                name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
              }, {
                match: "\\*",
                name: "comment.block.cuda-cpp"
              }]
            },
            6: {
              name: "meta.qualified_type.cuda-cpp",
              patterns: [{
                match: "::",
                name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
              }, {
                match: "(?<!\\w)(?:(?:struct)|(?:class)|(?:union)|(?:enum))(?!\\w)",
                name: "storage.type.$0.cuda-cpp"
              }, {
                include: "#attributes_context"
              }, {
                include: "#storage_types"
              }, {
                include: "#number_literal"
              }, {
                include: "#string_context"
              }, {
                include: "#comma"
              }, {
                include: "#scope_resolution_inner_generated"
              }, {
                begin: "<",
                end: ">",
                beginCaptures: {
                  0: {
                    name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
                  }
                },
                endCaptures: {
                  0: {
                    name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
                  }
                },
                name: "meta.template.call.cuda-cpp",
                patterns: [{
                  include: "#template_call_context"
                }]
              }, {
                match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
                name: "entity.name.type.cuda-cpp"
              }]
            },
            7: {
              patterns: [{
                include: "#attributes_context"
              }, {
                include: "#number_literal"
              }]
            },
            8: {
              patterns: [{
                include: "#inline_comment"
              }]
            },
            9: {
              name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
            },
            10: {
              name: "comment.block.cuda-cpp"
            },
            11: {
              patterns: [{
                match: "\\*\\/",
                name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
              }, {
                match: "\\*",
                name: "comment.block.cuda-cpp"
              }]
            },
            12: {
              patterns: [{
                include: "#inline_comment"
              }]
            },
            13: {
              name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
            },
            14: {
              name: "comment.block.cuda-cpp"
            },
            15: {
              patterns: [{
                match: "\\*\\/",
                name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
              }, {
                match: "\\*",
                name: "comment.block.cuda-cpp"
              }]
            },
            16: {
              patterns: [{
                match: "::",
                name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.type.cuda-cpp"
              }, {
                match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
                name: "entity.name.scope-resolution.type.cuda-cpp"
              }, {
                include: "#template_call_range"
              }]
            },
            17: {
              patterns: [{
                include: "#template_call_range"
              }]
            },
            18: {},
            19: {
              patterns: [{
                include: "#inline_comment"
              }]
            },
            20: {
              name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
            },
            21: {
              name: "comment.block.cuda-cpp"
            },
            22: {
              patterns: [{
                match: "\\*\\/",
                name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
              }, {
                match: "\\*",
                name: "comment.block.cuda-cpp"
              }]
            },
            23: {}
          }
        }, {
          include: "$self"
        }]
      }, {
        begin: "(?<=\\{|<%|\\?\\?<)",
        end: "\\}|%>|\\?\\?>",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.function.definition.cuda-cpp"
          }
        },
        name: "meta.body.function.definition.cuda-cpp",
        patterns: [{
          include: "#function_body_context"
        }]
      }, {
        begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
        end: "[\\s]*(?=;)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.tail.function.definition.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }]
    },
    function_parameter_context: {
      patterns: [{
        include: "#ever_present_context"
      }, {
        include: "#parameter"
      }, {
        include: "#comma"
      }]
    },
    function_pointer: {
      begin: `(\\s*+((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:(?:unsigned)|(?:signed)|(?:short)|(?:long))|(?:(?:struct)|(?:class)|(?:union)|(?:enum)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<18>?)+>)(?:\\s)*+)?::)*+)?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?!(?:(?:transaction_safe_dynamic)|(?:__has_cpp_attribute)|(?:reinterpret_cast)|(?:transaction_safe)|(?:__forceinline__)|(?:atomic_noexcept)|(?:__has_include)|(?:atomic_cancel)|(?:atomic_commit)|(?:dynamic_cast)|(?:__constant__)|(?:__restrict__)|(?:__noinline__)|(?:thread_local)|(?:synchronized)|(?:static_cast)|(?:__managed__)|(?:const_cast)|(?:__shared__)|(?:__global__)|(?:__device__)|(?:co_return)|(?:constexpr)|(?:constexpr)|(?:constexpr)|(?:consteval)|(?:protected)|(?:threadIdx)|(?:namespace)|(?:co_return)|(?:noexcept)|(?:noexcept)|(?:continue)|(?:co_await)|(?:co_yield)|(?:volatile)|(?:register)|(?:restrict)|(?:explicit)|(?:__host__)|(?:override)|(?:volatile)|(?:noexcept)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:template)|(?:operator)|(?:decltype)|(?:typename)|(?:requires)|(?:co_await)|(?:co_yield)|(?:reflexpr)|(?:alignof)|(?:alignas)|(?:default)|(?:nullptr)|(?:mutable)|(?:virtual)|(?:mutable)|(?:private)|(?:include)|(?:warning)|(?:_Pragma)|(?:defined)|(?:gridDim)|(?:typedef)|(?:__asm__)|(?:concept)|(?:sizeof)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:typeid)|(?:switch)|(?:return)|(?:static)|(?:extern)|(?:inline)|(?:friend)|(?:public)|(?:ifndef)|(?:define)|(?:pragma)|(?:export)|(?:import)|(?:module)|(?:compl)|(?:bitor)|(?:throw)|(?:or_eq)|(?:while)|(?:catch)|(?:break)|(?:false)|(?:const)|(?:final)|(?:const)|(?:endif)|(?:ifdef)|(?:undef)|(?:error)|(?:using)|(?:audit)|(?:axiom)|(?:else)|(?:goto)|(?:case)|(?:NULL)|(?:true)|(?:elif)|(?:else)|(?:line)|(?:this)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:for)|(?:try)|(?:asm)|(?:or)|(?:do)|(?:if)|(?:if))\\b)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<18>?)+>)?(?![\\w<:.]))(((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()(\\*)(?:(?:\\s)+)?((?:(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)?)(?:(?:\\s)+)?(?:(\\[)(\\w*)(\\])(?:(?:\\s)+)?)*(\\))(?:(?:\\s)+)?(\\()`,
      end: "(\\))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=[{=,);>]|\\n)(?!\\()",
      beginCaptures: {
        1: {
          name: "meta.qualified_type.cuda-cpp",
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:(?:struct)|(?:class)|(?:union)|(?:enum))(?!\\w)",
            name: "storage.type.$0.cuda-cpp"
          }, {
            include: "#attributes_context"
          }, {
            include: "#storage_types"
          }, {
            include: "#number_literal"
          }, {
            include: "#string_context"
          }, {
            include: "#comma"
          }, {
            include: "#scope_resolution_inner_generated"
          }, {
            begin: "<",
            end: ">",
            beginCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
              }
            },
            name: "meta.template.call.cuda-cpp",
            patterns: [{
              include: "#template_call_context"
            }]
          }, {
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.type.cuda-cpp"
          }]
        },
        2: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        3: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        4: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        5: {
          name: "comment.block.cuda-cpp"
        },
        6: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        7: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        8: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        9: {
          name: "comment.block.cuda-cpp"
        },
        10: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        11: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.type.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.type.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        12: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        13: {},
        14: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        15: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        16: {
          name: "comment.block.cuda-cpp"
        },
        17: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        18: {},
        19: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        20: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        21: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        22: {
          name: "comment.block.cuda-cpp"
        },
        23: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        24: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        25: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        26: {
          name: "comment.block.cuda-cpp"
        },
        27: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        28: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        29: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        30: {
          name: "comment.block.cuda-cpp"
        },
        31: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        32: {
          name: "punctuation.section.parens.begin.bracket.round.function.pointer.cuda-cpp"
        },
        33: {
          name: "punctuation.definition.function.pointer.dereference.cuda-cpp"
        },
        34: {
          name: "variable.other.definition.pointer.function.cuda-cpp"
        },
        35: {
          name: "punctuation.definition.begin.bracket.square.cuda-cpp"
        },
        36: {
          patterns: [{
            include: "#evaluation_context"
          }]
        },
        37: {
          name: "punctuation.definition.end.bracket.square.cuda-cpp"
        },
        38: {
          name: "punctuation.section.parens.end.bracket.round.function.pointer.cuda-cpp"
        },
        39: {
          name: "punctuation.section.parameters.begin.bracket.round.function.pointer.cuda-cpp"
        }
      },
      endCaptures: {
        1: {
          name: "punctuation.section.parameters.end.bracket.round.function.pointer.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        }
      },
      patterns: [{
        include: "#function_parameter_context"
      }]
    },
    function_pointer_parameter: {
      begin: `(\\s*+((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:(?:unsigned)|(?:signed)|(?:short)|(?:long))|(?:(?:struct)|(?:class)|(?:union)|(?:enum)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<18>?)+>)(?:\\s)*+)?::)*+)?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?!(?:(?:transaction_safe_dynamic)|(?:__has_cpp_attribute)|(?:reinterpret_cast)|(?:transaction_safe)|(?:__forceinline__)|(?:atomic_noexcept)|(?:__has_include)|(?:atomic_cancel)|(?:atomic_commit)|(?:dynamic_cast)|(?:__constant__)|(?:__restrict__)|(?:__noinline__)|(?:thread_local)|(?:synchronized)|(?:static_cast)|(?:__managed__)|(?:const_cast)|(?:__shared__)|(?:__global__)|(?:__device__)|(?:co_return)|(?:constexpr)|(?:constexpr)|(?:constexpr)|(?:consteval)|(?:protected)|(?:threadIdx)|(?:namespace)|(?:co_return)|(?:noexcept)|(?:noexcept)|(?:continue)|(?:co_await)|(?:co_yield)|(?:volatile)|(?:register)|(?:restrict)|(?:explicit)|(?:__host__)|(?:override)|(?:volatile)|(?:noexcept)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:template)|(?:operator)|(?:decltype)|(?:typename)|(?:requires)|(?:co_await)|(?:co_yield)|(?:reflexpr)|(?:alignof)|(?:alignas)|(?:default)|(?:nullptr)|(?:mutable)|(?:virtual)|(?:mutable)|(?:private)|(?:include)|(?:warning)|(?:_Pragma)|(?:defined)|(?:gridDim)|(?:typedef)|(?:__asm__)|(?:concept)|(?:sizeof)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:typeid)|(?:switch)|(?:return)|(?:static)|(?:extern)|(?:inline)|(?:friend)|(?:public)|(?:ifndef)|(?:define)|(?:pragma)|(?:export)|(?:import)|(?:module)|(?:compl)|(?:bitor)|(?:throw)|(?:or_eq)|(?:while)|(?:catch)|(?:break)|(?:false)|(?:const)|(?:final)|(?:const)|(?:endif)|(?:ifdef)|(?:undef)|(?:error)|(?:using)|(?:audit)|(?:axiom)|(?:else)|(?:goto)|(?:case)|(?:NULL)|(?:true)|(?:elif)|(?:else)|(?:line)|(?:this)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:for)|(?:try)|(?:asm)|(?:or)|(?:do)|(?:if)|(?:if))\\b)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<18>?)+>)?(?![\\w<:.]))(((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()(\\*)(?:(?:\\s)+)?((?:(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)?)(?:(?:\\s)+)?(?:(\\[)(\\w*)(\\])(?:(?:\\s)+)?)*(\\))(?:(?:\\s)+)?(\\()`,
      end: "(\\))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=[{=,);>]|\\n)(?!\\()",
      beginCaptures: {
        1: {
          name: "meta.qualified_type.cuda-cpp",
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:(?:struct)|(?:class)|(?:union)|(?:enum))(?!\\w)",
            name: "storage.type.$0.cuda-cpp"
          }, {
            include: "#attributes_context"
          }, {
            include: "#storage_types"
          }, {
            include: "#number_literal"
          }, {
            include: "#string_context"
          }, {
            include: "#comma"
          }, {
            include: "#scope_resolution_inner_generated"
          }, {
            begin: "<",
            end: ">",
            beginCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
              }
            },
            name: "meta.template.call.cuda-cpp",
            patterns: [{
              include: "#template_call_context"
            }]
          }, {
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.type.cuda-cpp"
          }]
        },
        2: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        3: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        4: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        5: {
          name: "comment.block.cuda-cpp"
        },
        6: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        7: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        8: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        9: {
          name: "comment.block.cuda-cpp"
        },
        10: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        11: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.type.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.type.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        12: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        13: {},
        14: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        15: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        16: {
          name: "comment.block.cuda-cpp"
        },
        17: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        18: {},
        19: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        20: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        21: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        22: {
          name: "comment.block.cuda-cpp"
        },
        23: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        24: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        25: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        26: {
          name: "comment.block.cuda-cpp"
        },
        27: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        28: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        29: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        30: {
          name: "comment.block.cuda-cpp"
        },
        31: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        32: {
          name: "punctuation.section.parens.begin.bracket.round.function.pointer.cuda-cpp"
        },
        33: {
          name: "punctuation.definition.function.pointer.dereference.cuda-cpp"
        },
        34: {
          name: "variable.parameter.pointer.function.cuda-cpp"
        },
        35: {
          name: "punctuation.definition.begin.bracket.square.cuda-cpp"
        },
        36: {
          patterns: [{
            include: "#evaluation_context"
          }]
        },
        37: {
          name: "punctuation.definition.end.bracket.square.cuda-cpp"
        },
        38: {
          name: "punctuation.section.parens.end.bracket.round.function.pointer.cuda-cpp"
        },
        39: {
          name: "punctuation.section.parameters.begin.bracket.round.function.pointer.cuda-cpp"
        }
      },
      endCaptures: {
        1: {
          name: "punctuation.section.parameters.end.bracket.round.function.pointer.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        }
      },
      patterns: [{
        include: "#function_parameter_context"
      }]
    },
    functional_specifiers_pre_parameters: {
      match: "(?<!\\w)(?:(?:__forceinline__)|(?:__noinline__)|(?:__global__)|(?:__device__)|(?:constexpr)|(?:explicit)|(?:__host__)|(?:mutable)|(?:virtual)|(?:inline)|(?:friend))(?!\\w)",
      name: "storage.modifier.specifier.functional.pre-parameters.$0.cuda-cpp"
    },
    gcc_attributes: {
      begin: "__attribute(?:__)?\\s*\\(\\s*\\(",
      end: "\\)\\s*\\)",
      beginCaptures: {
        0: {
          name: "punctuation.section.attribute.begin.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.attribute.end.cuda-cpp"
        }
      },
      name: "support.other.attribute.cuda-cpp",
      patterns: [{
        include: "#attributes_context"
      }, {
        begin: "\\(",
        end: "\\)",
        beginCaptures: {},
        endCaptures: {},
        patterns: [{
          include: "#attributes_context"
        }, {
          include: "#string_context"
        }]
      }, {
        match: "(using)(?:\\s)+((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))",
        captures: {
          1: {
            name: "keyword.other.using.directive.cuda-cpp"
          },
          2: {
            name: "entity.name.namespace.cuda-cpp"
          }
        }
      }, {
        match: ",",
        name: "punctuation.separator.attribute.cuda-cpp"
      }, {
        match: ":",
        name: "punctuation.accessor.attribute.cuda-cpp"
      }, {
        match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)(?=::)",
        name: "entity.name.namespace.cuda-cpp"
      }, {
        match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
        name: "entity.other.attribute.$0.cuda-cpp"
      }, {
        include: "#number_literal"
      }]
    },
    goto_statement: {
      match: "((?<!\\w)goto(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)",
      captures: {
        1: {
          name: "keyword.control.goto.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        4: {
          name: "entity.name.label.call.cuda-cpp"
        }
      }
    },
    identifier: {
      match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*"
    },
    include: {
      match: '^((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((#)(?:(?:\\s)+)?((?:include|include_next))\\b)(?:(?:\\s)+)?(?:(?:(?:((<)[^>]*(>?)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:\\n)|$)|(?=\\/\\/)))|((\\")[^\\"]*((?:\\")?)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:\\n)|$)|(?=\\/\\/))))|(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?:\\.(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)*((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:\\n)|$)|(?=(?:\\/\\/|;)))))|((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:\\n)|$)|(?=(?:\\/\\/|;))))',
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "keyword.control.directive.$5.cuda-cpp"
        },
        4: {
          name: "punctuation.definition.directive.cuda-cpp"
        },
        6: {
          name: "string.quoted.other.lt-gt.include.cuda-cpp"
        },
        7: {
          name: "punctuation.definition.string.begin.cuda-cpp"
        },
        8: {
          name: "punctuation.definition.string.end.cuda-cpp"
        },
        9: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        10: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        11: {
          name: "string.quoted.double.include.cuda-cpp"
        },
        12: {
          name: "punctuation.definition.string.begin.cuda-cpp"
        },
        13: {
          name: "punctuation.definition.string.end.cuda-cpp"
        },
        14: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        15: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        16: {
          name: "entity.name.other.preprocessor.macro.include.cuda-cpp"
        },
        17: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        18: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        19: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        20: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        21: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        22: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      },
      name: "meta.preprocessor.include.cuda-cpp"
    },
    inheritance_context: {
      patterns: [{
        include: "#ever_present_context"
      }, {
        match: ",",
        name: "punctuation.separator.delimiter.comma.inheritance.cuda-cpp"
      }, {
        match: "(?<!\\w)(?:(?:protected)|(?:private)|(?:public))(?!\\w)",
        name: "storage.type.modifier.access.$0.cuda-cpp"
      }, {
        match: "(?<!\\w)virtual(?!\\w)",
        name: "storage.type.modifier.virtual.cuda-cpp"
      }, {
        match: `(?<=protected|virtual|private|public|,|:)(?:(?:\\s)+)?(?!(?:(?:(?:protected)|(?:private)|(?:public))|virtual))(\\s*+((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:(?:unsigned)|(?:signed)|(?:short)|(?:long))|(?:(?:struct)|(?:class)|(?:union)|(?:enum)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<12>?)+>)(?:\\s)*+)?::)*+)?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?!(?:(?:transaction_safe_dynamic)|(?:__has_cpp_attribute)|(?:reinterpret_cast)|(?:transaction_safe)|(?:__forceinline__)|(?:atomic_noexcept)|(?:__has_include)|(?:atomic_cancel)|(?:atomic_commit)|(?:dynamic_cast)|(?:__constant__)|(?:__restrict__)|(?:__noinline__)|(?:thread_local)|(?:synchronized)|(?:static_cast)|(?:__managed__)|(?:const_cast)|(?:__shared__)|(?:__global__)|(?:__device__)|(?:co_return)|(?:constexpr)|(?:constexpr)|(?:constexpr)|(?:consteval)|(?:protected)|(?:threadIdx)|(?:namespace)|(?:co_return)|(?:noexcept)|(?:noexcept)|(?:continue)|(?:co_await)|(?:co_yield)|(?:volatile)|(?:register)|(?:restrict)|(?:explicit)|(?:__host__)|(?:override)|(?:volatile)|(?:noexcept)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:template)|(?:operator)|(?:decltype)|(?:typename)|(?:requires)|(?:co_await)|(?:co_yield)|(?:reflexpr)|(?:alignof)|(?:alignas)|(?:default)|(?:nullptr)|(?:mutable)|(?:virtual)|(?:mutable)|(?:private)|(?:include)|(?:warning)|(?:_Pragma)|(?:defined)|(?:gridDim)|(?:typedef)|(?:__asm__)|(?:concept)|(?:sizeof)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:typeid)|(?:switch)|(?:return)|(?:static)|(?:extern)|(?:inline)|(?:friend)|(?:public)|(?:ifndef)|(?:define)|(?:pragma)|(?:export)|(?:import)|(?:module)|(?:compl)|(?:bitor)|(?:throw)|(?:or_eq)|(?:while)|(?:catch)|(?:break)|(?:false)|(?:const)|(?:final)|(?:const)|(?:endif)|(?:ifdef)|(?:undef)|(?:error)|(?:using)|(?:audit)|(?:axiom)|(?:else)|(?:goto)|(?:case)|(?:NULL)|(?:true)|(?:elif)|(?:else)|(?:line)|(?:this)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:for)|(?:try)|(?:asm)|(?:or)|(?:do)|(?:if)|(?:if))\\b)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<12>?)+>)?(?![\\w<:.]))`,
        captures: {
          1: {
            name: "meta.qualified_type.cuda-cpp",
            patterns: [{
              match: "::",
              name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
            }, {
              match: "(?<!\\w)(?:(?:struct)|(?:class)|(?:union)|(?:enum))(?!\\w)",
              name: "storage.type.$0.cuda-cpp"
            }, {
              include: "#attributes_context"
            }, {
              include: "#storage_types"
            }, {
              include: "#number_literal"
            }, {
              include: "#string_context"
            }, {
              include: "#comma"
            }, {
              include: "#scope_resolution_inner_generated"
            }, {
              begin: "<",
              end: ">",
              beginCaptures: {
                0: {
                  name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
                }
              },
              endCaptures: {
                0: {
                  name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
                }
              },
              name: "meta.template.call.cuda-cpp",
              patterns: [{
                include: "#template_call_context"
              }]
            }, {
              match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
              name: "entity.name.type.cuda-cpp"
            }]
          },
          2: {
            patterns: [{
              include: "#attributes_context"
            }, {
              include: "#number_literal"
            }]
          },
          3: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          4: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          5: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          6: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          7: {
            patterns: [{
              match: "::",
              name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.type.cuda-cpp"
            }, {
              match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
              name: "entity.name.scope-resolution.type.cuda-cpp"
            }, {
              include: "#template_call_range"
            }]
          },
          8: {
            patterns: [{
              include: "#template_call_range"
            }]
          },
          9: {},
          10: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          11: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          12: {}
        }
      }]
    },
    inline_builtin_storage_type: {
      match: "(?:\\s)*+(?<!\\w)(?:(?:(?:((?:(?:threadIdx)|(?:unsigned)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:wchar_t)|(?:gridDim)|(?:signed)|(?:double)|(?:short)|(?:float)|(?:auto)|(?:void)|(?:char)|(?:long)|(?:bool)|(?:int)))|((?:(?:uint_least16_t)|(?:uint_least32_t)|(?:uint_least64_t)|(?:int_least16_t)|(?:int_least32_t)|(?:int_least64_t)|(?:uint_least8_t)|(?:uint_fast16_t)|(?:uint_fast32_t)|(?:uint_fast64_t)|(?:int_least8_t)|(?:int_fast16_t)|(?:int_fast32_t)|(?:int_fast64_t)|(?:uint_fast8_t)|(?:suseconds_t)|(?:int_fast8_t)|(?:useconds_t)|(?:ulonglong1)|(?:ulonglong2)|(?:ulonglong3)|(?:ulonglong4)|(?:blksize_t)|(?:in_addr_t)|(?:in_port_t)|(?:uintptr_t)|(?:uintmax_t)|(?:uintmax_t)|(?:uintmax_t)|(?:longlong1)|(?:longlong2)|(?:longlong3)|(?:longlong4)|(?:u_quad_t)|(?:blkcnt_t)|(?:uint16_t)|(?:uint32_t)|(?:uint64_t)|(?:intptr_t)|(?:intmax_t)|(?:intmax_t)|(?:u_short)|(?:qaddr_t)|(?:caddr_t)|(?:daddr_t)|(?:fixpt_t)|(?:nlink_t)|(?:segsz_t)|(?:swblk_t)|(?:clock_t)|(?:ssize_t)|(?:int16_t)|(?:int32_t)|(?:int64_t)|(?:uint8_t)|(?:ushort1)|(?:ushort2)|(?:ushort3)|(?:ushort4)|(?:double1)|(?:double2)|(?:double3)|(?:double4)|(?:u_char)|(?:u_long)|(?:ushort)|(?:quad_t)|(?:mode_t)|(?:size_t)|(?:time_t)|(?:int8_t)|(?:uchar1)|(?:uchar2)|(?:uchar3)|(?:uchar4)|(?:short1)|(?:short2)|(?:short3)|(?:short4)|(?:ulong4)|(?:ulong1)|(?:ulong2)|(?:ulong3)|(?:ulong4)|(?:float1)|(?:float2)|(?:float3)|(?:float4)|(?:u_int)|(?:div_t)|(?:dev_t)|(?:gid_t)|(?:ino_t)|(?:key_t)|(?:pid_t)|(?:off_t)|(?:uid_t)|(?:char1)|(?:char2)|(?:char3)|(?:char4)|(?:uint1)|(?:uint2)|(?:uint3)|(?:uint4)|(?:long1)|(?:long2)|(?:long3)|(?:uint)|(?:id_t)|(?:id_t)|(?:int1)|(?:int2)|(?:int3)|(?:int4)|(?:dim3))))|((?:(?:pthread_rwlockattr_t)|(?:pthread_mutexattr_t)|(?:pthread_condattr_t)|(?:pthread_rwlock_t)|(?:pthread_mutex_t)|(?:pthread_attr_t)|(?:pthread_cond_t)|(?:pthread_once_t)|(?:pthread_key_t)|(?:pthread_t))))|([a-zA-Z_](?:\\w)*_t))(?!\\w)",
      captures: {
        1: {
          name: "storage.type.primitive.cuda-cpp storage.type.built-in.primitive.cuda-cpp"
        },
        2: {
          name: "storage.type.cuda-cpp storage.type.built-in.cuda-cpp"
        },
        3: {
          name: "support.type.posix-reserved.pthread.cuda-cpp support.type.built-in.posix-reserved.pthread.cuda-cpp"
        },
        4: {
          name: "support.type.posix-reserved.cuda-cpp support.type.built-in.posix-reserved.cuda-cpp"
        }
      }
    },
    inline_comment: {
      match: "(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/))",
      captures: {
        1: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        2: {
          name: "comment.block.cuda-cpp"
        },
        3: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        }
      }
    },
    invalid_comment_end: {
      match: "\\*\\/",
      name: "invalid.illegal.unexpected.punctuation.definition.comment.end.cuda-cpp"
    },
    label: {
      match: "((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))\\b(?<!case|default)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(:)",
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "entity.name.label.cuda-cpp"
        },
        4: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        5: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        6: {
          name: "punctuation.separator.label.cuda-cpp"
        }
      }
    },
    lambdas: {
      begin: '(?:(?<=[^\\s]|^)(?<![\\w\\]\\)\\[\\*&">])|(?<=\\Wreturn|^return))(?:(?:\\s)+)?(\\[(?!\\[| *+"| *+\\d))((?:[^\\[\\]]|((?<!\\[)\\[(?!\\[)(?:[^\\[\\]]*+\\g<3>?)++\\]))*+)(\\](?!((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))[\\[\\];]))',
      end: "(?<=[;}])",
      beginCaptures: {
        1: {
          name: "punctuation.definition.capture.begin.lambda.cuda-cpp"
        },
        2: {
          name: "meta.lambda.capture.cuda-cpp",
          patterns: [{
            include: "#the_this_keyword"
          }, {
            match: "((?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?=\\]|\\z|$)|(,))|(\\=))",
            captures: {
              1: {
                name: "variable.parameter.capture.cuda-cpp"
              },
              2: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              3: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              4: {
                name: "comment.block.cuda-cpp"
              },
              5: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              6: {
                name: "punctuation.separator.delimiter.comma.cuda-cpp"
              },
              7: {
                name: "keyword.operator.assignment.cuda-cpp"
              }
            }
          }, {
            include: "#evaluation_context"
          }]
        },
        3: {},
        4: {
          name: "punctuation.definition.capture.end.lambda.cuda-cpp"
        },
        5: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        6: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        7: {
          name: "comment.block.cuda-cpp"
        },
        8: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        }
      },
      endCaptures: {},
      patterns: [{
        begin: "\\(",
        end: "\\)",
        beginCaptures: {
          0: {
            name: "punctuation.definition.parameters.begin.lambda.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.definition.parameters.end.lambda.cuda-cpp"
          }
        },
        name: "meta.function.definition.parameters.lambda.cuda-cpp",
        patterns: [{
          include: "#function_parameter_context"
        }]
      }, {
        match: "(?<!\\w)(?:(?:constexpr)|(?:consteval)|(?:mutable))(?!\\w)",
        name: "storage.modifier.lambda.$0.cuda-cpp"
      }, {
        match: "(->)((?:.+?(?=\\{|$))?)",
        captures: {
          1: {
            name: "punctuation.definition.lambda.return-type.cuda-cpp"
          },
          2: {
            name: "storage.type.return-type.lambda.cuda-cpp"
          }
        }
      }, {
        begin: "\\{",
        end: "\\}",
        beginCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.lambda.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.lambda.cuda-cpp"
          }
        },
        name: "meta.function.definition.body.lambda.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }]
    },
    language_constants: {
      match: "(?<!\\w)(?:(?:nullptr)|(?:false)|(?:NULL)|(?:true))(?!\\w)",
      name: "constant.language.$0.cuda-cpp"
    },
    line: {
      begin: "^((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(#)(?:(?:\\s)+)?line\\b",
      end: "(?<!\\\\)(?=\\n)",
      beginCaptures: {
        0: {
          name: "keyword.control.directive.line.cuda-cpp"
        },
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          name: "punctuation.definition.directive.cuda-cpp"
        }
      },
      endCaptures: {},
      name: "meta.preprocessor.line.cuda-cpp",
      patterns: [{
        include: "#string_context"
      }, {
        include: "#preprocessor_number_literal"
      }, {
        include: "#line_continuation_character"
      }]
    },
    line_comment: {
      begin: "\\s*+(\\/\\/)",
      end: "(?<=\\n)(?<!\\\\\\n)",
      beginCaptures: {
        1: {
          name: "punctuation.definition.comment.cuda-cpp"
        }
      },
      endCaptures: {},
      name: "comment.line.double-slash.cuda-cpp",
      patterns: [{
        include: "#line_continuation_character"
      }]
    },
    line_continuation_character: {
      match: "\\\\\\n",
      name: "constant.character.escape.line-continuation.cuda-cpp"
    },
    macro: {
      begin: "(^((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(#)(?:(?:\\s)+)?define\\b)(?:(?:\\s)+)?((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))",
      end: "(?<!\\\\)(?=\\n)",
      beginCaptures: {
        1: {
          name: "keyword.control.directive.define.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        6: {
          name: "punctuation.definition.directive.cuda-cpp"
        },
        7: {
          name: "entity.name.function.preprocessor.cuda-cpp"
        }
      },
      endCaptures: {},
      name: "meta.preprocessor.macro.cuda-cpp",
      patterns: [{
        match: "\\G(?:(?:\\s)+)?(\\()([^\\(]*)(\\))",
        captures: {
          1: {
            name: "punctuation.definition.parameters.begin.preprocessor.cuda-cpp"
          },
          2: {
            patterns: [{
              match: "(?<=[(,])(?:(?:\\s)+)?((?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)(?:(?:\\s)+)?",
              captures: {
                1: {
                  name: "variable.parameter.preprocessor.cuda-cpp"
                }
              }
            }, {
              match: ",",
              name: "punctuation.separator.parameters.cuda-cpp"
            }, {
              match: "\\.\\.\\.",
              name: "punctuation.vararg-ellipses.variable.parameter.preprocessor.cuda-cpp"
            }]
          },
          3: {
            name: "punctuation.definition.parameters.end.preprocessor.cuda-cpp"
          }
        }
      }, {
        include: "#macro_context"
      }, {
        include: "#macro_argument"
      }]
    },
    macro_argument: {
      match: "##?(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
      name: "variable.other.macro.argument.cuda-cpp"
    },
    macro_context: {
      patterns: [{
        include: "source.cpp.embedded.macro"
      }]
    },
    macro_name: {
      match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
      name: "entity.name.function.preprocessor.cuda-cpp"
    },
    member_access: {
      match: `(?:((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)this(?!\\w))|((?:(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*|(?<=\\]|\\)))(?:(?:\\s)+)?))(?:((?:\\.\\*|\\.))|((?:->\\*|->)))((?:(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?:(?:\\s)+)?(?:(?:\\.\\*|\\.)|(?:->\\*|->))(?:(?:\\s)+)?)*)(?:(?:\\s)+)?(\\b(?!uint_least16_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uint_least32_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uint_least64_t[^Pattern.new(
  match: \\/\\w\\/,
)]|int_least16_t[^Pattern.new(
  match: \\/\\w\\/,
)]|int_least32_t[^Pattern.new(
  match: \\/\\w\\/,
)]|int_least64_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uint_least8_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uint_fast16_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uint_fast32_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uint_fast64_t[^Pattern.new(
  match: \\/\\w\\/,
)]|int_least8_t[^Pattern.new(
  match: \\/\\w\\/,
)]|int_fast16_t[^Pattern.new(
  match: \\/\\w\\/,
)]|int_fast32_t[^Pattern.new(
  match: \\/\\w\\/,
)]|int_fast64_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uint_fast8_t[^Pattern.new(
  match: \\/\\w\\/,
)]|suseconds_t[^Pattern.new(
  match: \\/\\w\\/,
)]|int_fast8_t[^Pattern.new(
  match: \\/\\w\\/,
)]|useconds_t[^Pattern.new(
  match: \\/\\w\\/,
)]|ulonglong1[^Pattern.new(
  match: \\/\\w\\/,
)]|ulonglong2[^Pattern.new(
  match: \\/\\w\\/,
)]|ulonglong3[^Pattern.new(
  match: \\/\\w\\/,
)]|ulonglong4[^Pattern.new(
  match: \\/\\w\\/,
)]|blksize_t[^Pattern.new(
  match: \\/\\w\\/,
)]|in_addr_t[^Pattern.new(
  match: \\/\\w\\/,
)]|in_port_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uintptr_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uintmax_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uintmax_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uintmax_t[^Pattern.new(
  match: \\/\\w\\/,
)]|longlong1[^Pattern.new(
  match: \\/\\w\\/,
)]|longlong2[^Pattern.new(
  match: \\/\\w\\/,
)]|longlong3[^Pattern.new(
  match: \\/\\w\\/,
)]|longlong4[^Pattern.new(
  match: \\/\\w\\/,
)]|unsigned[^Pattern.new(
  match: \\/\\w\\/,
)]|u_quad_t[^Pattern.new(
  match: \\/\\w\\/,
)]|blkcnt_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uint16_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uint32_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uint64_t[^Pattern.new(
  match: \\/\\w\\/,
)]|intptr_t[^Pattern.new(
  match: \\/\\w\\/,
)]|intmax_t[^Pattern.new(
  match: \\/\\w\\/,
)]|intmax_t[^Pattern.new(
  match: \\/\\w\\/,
)]|wchar_t[^Pattern.new(
  match: \\/\\w\\/,
)]|u_short[^Pattern.new(
  match: \\/\\w\\/,
)]|qaddr_t[^Pattern.new(
  match: \\/\\w\\/,
)]|caddr_t[^Pattern.new(
  match: \\/\\w\\/,
)]|daddr_t[^Pattern.new(
  match: \\/\\w\\/,
)]|fixpt_t[^Pattern.new(
  match: \\/\\w\\/,
)]|nlink_t[^Pattern.new(
  match: \\/\\w\\/,
)]|segsz_t[^Pattern.new(
  match: \\/\\w\\/,
)]|swblk_t[^Pattern.new(
  match: \\/\\w\\/,
)]|clock_t[^Pattern.new(
  match: \\/\\w\\/,
)]|ssize_t[^Pattern.new(
  match: \\/\\w\\/,
)]|int16_t[^Pattern.new(
  match: \\/\\w\\/,
)]|int32_t[^Pattern.new(
  match: \\/\\w\\/,
)]|int64_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uint8_t[^Pattern.new(
  match: \\/\\w\\/,
)]|ushort1[^Pattern.new(
  match: \\/\\w\\/,
)]|ushort2[^Pattern.new(
  match: \\/\\w\\/,
)]|ushort3[^Pattern.new(
  match: \\/\\w\\/,
)]|ushort4[^Pattern.new(
  match: \\/\\w\\/,
)]|double1[^Pattern.new(
  match: \\/\\w\\/,
)]|double2[^Pattern.new(
  match: \\/\\w\\/,
)]|double3[^Pattern.new(
  match: \\/\\w\\/,
)]|double4[^Pattern.new(
  match: \\/\\w\\/,
)]|signed[^Pattern.new(
  match: \\/\\w\\/,
)]|double[^Pattern.new(
  match: \\/\\w\\/,
)]|u_char[^Pattern.new(
  match: \\/\\w\\/,
)]|u_long[^Pattern.new(
  match: \\/\\w\\/,
)]|ushort[^Pattern.new(
  match: \\/\\w\\/,
)]|quad_t[^Pattern.new(
  match: \\/\\w\\/,
)]|mode_t[^Pattern.new(
  match: \\/\\w\\/,
)]|size_t[^Pattern.new(
  match: \\/\\w\\/,
)]|time_t[^Pattern.new(
  match: \\/\\w\\/,
)]|int8_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uchar1[^Pattern.new(
  match: \\/\\w\\/,
)]|uchar2[^Pattern.new(
  match: \\/\\w\\/,
)]|uchar3[^Pattern.new(
  match: \\/\\w\\/,
)]|uchar4[^Pattern.new(
  match: \\/\\w\\/,
)]|short1[^Pattern.new(
  match: \\/\\w\\/,
)]|short2[^Pattern.new(
  match: \\/\\w\\/,
)]|short3[^Pattern.new(
  match: \\/\\w\\/,
)]|short4[^Pattern.new(
  match: \\/\\w\\/,
)]|ulong4[^Pattern.new(
  match: \\/\\w\\/,
)]|ulong1[^Pattern.new(
  match: \\/\\w\\/,
)]|ulong2[^Pattern.new(
  match: \\/\\w\\/,
)]|ulong3[^Pattern.new(
  match: \\/\\w\\/,
)]|ulong4[^Pattern.new(
  match: \\/\\w\\/,
)]|float1[^Pattern.new(
  match: \\/\\w\\/,
)]|float2[^Pattern.new(
  match: \\/\\w\\/,
)]|float3[^Pattern.new(
  match: \\/\\w\\/,
)]|float4[^Pattern.new(
  match: \\/\\w\\/,
)]|short[^Pattern.new(
  match: \\/\\w\\/,
)]|float[^Pattern.new(
  match: \\/\\w\\/,
)]|u_int[^Pattern.new(
  match: \\/\\w\\/,
)]|div_t[^Pattern.new(
  match: \\/\\w\\/,
)]|dev_t[^Pattern.new(
  match: \\/\\w\\/,
)]|gid_t[^Pattern.new(
  match: \\/\\w\\/,
)]|ino_t[^Pattern.new(
  match: \\/\\w\\/,
)]|key_t[^Pattern.new(
  match: \\/\\w\\/,
)]|pid_t[^Pattern.new(
  match: \\/\\w\\/,
)]|off_t[^Pattern.new(
  match: \\/\\w\\/,
)]|uid_t[^Pattern.new(
  match: \\/\\w\\/,
)]|char1[^Pattern.new(
  match: \\/\\w\\/,
)]|char2[^Pattern.new(
  match: \\/\\w\\/,
)]|char3[^Pattern.new(
  match: \\/\\w\\/,
)]|char4[^Pattern.new(
  match: \\/\\w\\/,
)]|uint1[^Pattern.new(
  match: \\/\\w\\/,
)]|uint2[^Pattern.new(
  match: \\/\\w\\/,
)]|uint3[^Pattern.new(
  match: \\/\\w\\/,
)]|uint4[^Pattern.new(
  match: \\/\\w\\/,
)]|long1[^Pattern.new(
  match: \\/\\w\\/,
)]|long2[^Pattern.new(
  match: \\/\\w\\/,
)]|long3[^Pattern.new(
  match: \\/\\w\\/,
)]|auto[^Pattern.new(
  match: \\/\\w\\/,
)]|void[^Pattern.new(
  match: \\/\\w\\/,
)]|char[^Pattern.new(
  match: \\/\\w\\/,
)]|long[^Pattern.new(
  match: \\/\\w\\/,
)]|bool[^Pattern.new(
  match: \\/\\w\\/,
)]|uint[^Pattern.new(
  match: \\/\\w\\/,
)]|id_t[^Pattern.new(
  match: \\/\\w\\/,
)]|id_t[^Pattern.new(
  match: \\/\\w\\/,
)]|int1[^Pattern.new(
  match: \\/\\w\\/,
)]|int2[^Pattern.new(
  match: \\/\\w\\/,
)]|int3[^Pattern.new(
  match: \\/\\w\\/,
)]|int4[^Pattern.new(
  match: \\/\\w\\/,
)]|dim3[^Pattern.new(
  match: \\/\\w\\/,
)]|int[^Pattern.new(
  match: \\/\\w\\/,
)])(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b(?!\\())`,
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "variable.language.this.cuda-cpp"
        },
        4: {
          name: "variable.other.object.access.cuda-cpp"
        },
        5: {
          name: "punctuation.separator.dot-access.cuda-cpp"
        },
        6: {
          name: "punctuation.separator.pointer-access.cuda-cpp"
        },
        7: {
          patterns: [{
            match: "(?<=(?:\\.\\*|\\.|->|->\\*))(?:(?:\\s)+)?(?:((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)this(?!\\w))|((?:(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*|(?<=\\]|\\)))(?:(?:\\s)+)?))(?:((?:\\.\\*|\\.))|((?:->\\*|->)))",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              5: {
                name: "variable.language.this.cuda-cpp"
              },
              6: {
                name: "variable.other.object.property.cuda-cpp"
              },
              7: {
                name: "punctuation.separator.dot-access.cuda-cpp"
              },
              8: {
                name: "punctuation.separator.pointer-access.cuda-cpp"
              }
            }
          }, {
            match: "(?:((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)this(?!\\w))|((?:(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*|(?<=\\]|\\)))(?:(?:\\s)+)?))(?:((?:\\.\\*|\\.))|((?:->\\*|->)))",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              5: {
                name: "variable.language.this.cuda-cpp"
              },
              6: {
                name: "variable.other.object.access.cuda-cpp"
              },
              7: {
                name: "punctuation.separator.dot-access.cuda-cpp"
              },
              8: {
                name: "punctuation.separator.pointer-access.cuda-cpp"
              }
            }
          }, {
            include: "#member_access"
          }, {
            include: "#method_access"
          }]
        },
        8: {
          name: "variable.other.property.cuda-cpp"
        }
      }
    },
    memory_operators: {
      match: "((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:(?:(delete)(?:(?:\\s)+)?(\\[\\])|(delete))|(new))(?!\\w))",
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "keyword.operator.wordlike.cuda-cpp"
        },
        4: {
          name: "keyword.operator.delete.array.cuda-cpp"
        },
        5: {
          name: "keyword.operator.delete.array.bracket.cuda-cpp"
        },
        6: {
          name: "keyword.operator.delete.cuda-cpp"
        },
        7: {
          name: "keyword.operator.new.cuda-cpp"
        }
      }
    },
    method_access: {
      begin: "(?:((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)this(?!\\w))|((?:(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*|(?<=\\]|\\)))(?:(?:\\s)+)?))(?:((?:\\.\\*|\\.))|((?:->\\*|->)))((?:(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?:(?:\\s)+)?(?:(?:\\.\\*|\\.)|(?:->\\*|->))(?:(?:\\s)+)?)*)(?:(?:\\s)+)?(~?(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)(?:(?:\\s)+)?(\\()",
      end: "\\)",
      beginCaptures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          name: "variable.language.this.cuda-cpp"
        },
        6: {
          name: "variable.other.object.access.cuda-cpp"
        },
        7: {
          name: "punctuation.separator.dot-access.cuda-cpp"
        },
        8: {
          name: "punctuation.separator.pointer-access.cuda-cpp"
        },
        9: {
          patterns: [{
            match: "(?<=(?:\\.\\*|\\.|->|->\\*))(?:(?:\\s)+)?(?:((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)this(?!\\w))|((?:(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*|(?<=\\]|\\)))(?:(?:\\s)+)?))(?:((?:\\.\\*|\\.))|((?:->\\*|->)))",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              5: {
                name: "variable.language.this.cuda-cpp"
              },
              6: {
                name: "variable.other.object.property.cuda-cpp"
              },
              7: {
                name: "punctuation.separator.dot-access.cuda-cpp"
              },
              8: {
                name: "punctuation.separator.pointer-access.cuda-cpp"
              }
            }
          }, {
            match: "(?:((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)this(?!\\w))|((?:(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*|(?<=\\]|\\)))(?:(?:\\s)+)?))(?:((?:\\.\\*|\\.))|((?:->\\*|->)))",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              5: {
                name: "variable.language.this.cuda-cpp"
              },
              6: {
                name: "variable.other.object.access.cuda-cpp"
              },
              7: {
                name: "punctuation.separator.dot-access.cuda-cpp"
              },
              8: {
                name: "punctuation.separator.pointer-access.cuda-cpp"
              }
            }
          }, {
            include: "#member_access"
          }, {
            include: "#method_access"
          }]
        },
        10: {
          name: "entity.name.function.member.cuda-cpp"
        },
        11: {
          name: "punctuation.section.arguments.begin.bracket.round.function.member.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.arguments.end.bracket.round.function.member.cuda-cpp"
        }
      },
      patterns: [{
        include: "#evaluation_context"
      }]
    },
    misc_keywords: {
      match: "((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:(?:requires)|(?:typedef)|(?:concept)|(?:export)|(?:module))(?!\\w))",
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "keyword.other.$3.cuda-cpp"
        }
      }
    },
    ms_attributes: {
      begin: "__declspec\\(",
      end: "\\)",
      beginCaptures: {
        0: {
          name: "punctuation.section.attribute.begin.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.attribute.end.cuda-cpp"
        }
      },
      name: "support.other.attribute.cuda-cpp",
      patterns: [{
        include: "#attributes_context"
      }, {
        begin: "\\(",
        end: "\\)",
        beginCaptures: {},
        endCaptures: {},
        patterns: [{
          include: "#attributes_context"
        }, {
          include: "#string_context"
        }]
      }, {
        match: "(using)(?:\\s)+((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))",
        captures: {
          1: {
            name: "keyword.other.using.directive.cuda-cpp"
          },
          2: {
            name: "entity.name.namespace.cuda-cpp"
          }
        }
      }, {
        match: ",",
        name: "punctuation.separator.attribute.cuda-cpp"
      }, {
        match: ":",
        name: "punctuation.accessor.attribute.cuda-cpp"
      }, {
        match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)(?=::)",
        name: "entity.name.namespace.cuda-cpp"
      }, {
        match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
        name: "entity.other.attribute.$0.cuda-cpp"
      }, {
        include: "#number_literal"
      }]
    },
    namespace_alias: {
      match: `(?<!\\w)(namespace)(?:\\s)+((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(?:(?:\\s)+)?(\\=)(?:(?:\\s)+)?(((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<8>?)+>)(?:\\s)*+)?::)*\\s*+)(?:(?:\\s)+)?((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(?:(?:\\s)+)?(?:(;)|\\n))`,
      captures: {
        1: {
          name: "keyword.other.namespace.alias.cuda-cpp storage.type.namespace.alias.cuda-cpp"
        },
        2: {
          name: "entity.name.namespace.alias.cuda-cpp"
        },
        3: {
          name: "keyword.operator.assignment.cuda-cpp"
        },
        4: {
          name: "meta.declaration.namespace.alias.value.cuda-cpp"
        },
        5: {
          patterns: [{
            include: "#scope_resolution_namespace_alias_inner_generated"
          }]
        },
        6: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.namespace.alias.cuda-cpp"
        },
        7: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        9: {
          name: "entity.name.namespace.cuda-cpp"
        },
        10: {
          name: "punctuation.terminator.statement.cuda-cpp"
        }
      },
      name: "meta.declaration.namespace.alias.cuda-cpp"
    },
    namespace_block: {
      begin: "((?<!\\w)namespace(?!\\w))",
      end: "(?:(?<=\\}|%>|\\?\\?>)|(?=[;>\\[\\]=]))",
      beginCaptures: {
        0: {
          name: "meta.head.namespace.cuda-cpp"
        },
        1: {
          name: "keyword.other.namespace.definition.cuda-cpp storage.type.namespace.definition.cuda-cpp"
        }
      },
      endCaptures: {},
      name: "meta.block.namespace.cuda-cpp",
      patterns: [{
        begin: "\\G ?",
        end: "(?:\\{|<%|\\?\\?<|(?=;))",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.namespace.cuda-cpp"
          }
        },
        name: "meta.head.namespace.cuda-cpp",
        patterns: [{
          include: "#ever_present_context"
        }, {
          include: "#attributes_context"
        }, {
          match: `((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<4>?)+>)(?:\\s)*+)?::)*\\s*+)(?:(?:\\s)+)?((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(?:(?:\\s)+)?(?:(::)(?:(?:\\s)+)?(inline))?`,
          captures: {
            1: {
              patterns: [{
                include: "#scope_resolution_namespace_block_inner_generated"
              }]
            },
            2: {
              name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.namespace.block.cuda-cpp"
            },
            3: {
              patterns: [{
                include: "#template_call_range"
              }]
            },
            4: {},
            5: {
              name: "entity.name.namespace.cuda-cpp"
            },
            6: {
              name: "punctuation.separator.scope-resolution.namespace.block.cuda-cpp"
            },
            7: {
              name: "storage.modifier.inline.cuda-cpp"
            }
          }
        }]
      }, {
        begin: "(?<=\\{|<%|\\?\\?<)",
        end: "\\}|%>|\\?\\?>",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.namespace.cuda-cpp"
          }
        },
        name: "meta.body.namespace.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }, {
        begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
        end: "[\\s]*(?=;)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.tail.namespace.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }]
    },
    noexcept_operator: {
      begin: "((?<!\\w)noexcept(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
      end: "\\)",
      beginCaptures: {
        1: {
          name: "keyword.operator.functionlike.cuda-cpp keyword.operator.noexcept.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        6: {
          name: "punctuation.section.arguments.begin.bracket.round.operator.noexcept.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.arguments.end.bracket.round.operator.noexcept.cuda-cpp"
        }
      },
      contentName: "meta.arguments.operator.noexcept",
      patterns: [{
        include: "#evaluation_context"
      }]
    },
    number_literal: {
      match: "(?<!\\w)\\.?\\d(?:(?:[0-9a-zA-Z_\\.]|')|(?<=[eEpP])[+-])*",
      captures: {
        0: {
          patterns: [{
            begin: "(?=.)",
            end: "$",
            beginCaptures: {},
            endCaptures: {},
            patterns: [{
              match: "(\\G0[xX])([0-9a-fA-F](?:[0-9a-fA-F]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)?((?:(?<=[0-9a-fA-F])\\.|\\.(?=[0-9a-fA-F])))([0-9a-fA-F](?:[0-9a-fA-F]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)?(?:(?<!')([pP])((?:\\+)?)((?:\\-)?)([0-9](?:[0-9]|(?<=[0-9a-fA-F])'(?=[0-9a-fA-F]))*))?([lLfF](?!\\w))?((?:\\w(?<![0-9a-fA-FpP])\\w*)?$)",
              captures: {
                1: {
                  name: "keyword.other.unit.hexadecimal.cuda-cpp"
                },
                2: {
                  name: "constant.numeric.hexadecimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                3: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                4: {
                  name: "constant.numeric.hexadecimal.cuda-cpp"
                },
                5: {
                  name: "constant.numeric.hexadecimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                6: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                7: {
                  name: "keyword.other.unit.exponent.hexadecimal.cuda-cpp"
                },
                8: {
                  name: "keyword.operator.plus.exponent.hexadecimal.cuda-cpp"
                },
                9: {
                  name: "keyword.operator.minus.exponent.hexadecimal.cuda-cpp"
                },
                10: {
                  name: "constant.numeric.exponent.hexadecimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                11: {
                  name: "keyword.other.unit.suffix.floating-point.cuda-cpp"
                },
                12: {
                  name: "keyword.other.unit.user-defined.cuda-cpp"
                }
              }
            }, {
              match: "\\G(?=[0-9.])(?!0[xXbB])([0-9](?:[0-9]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)?((?:(?<=[0-9])\\.|\\.(?=[0-9])))([0-9](?:[0-9]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)?(?:(?<!')([eE])((?:\\+)?)((?:\\-)?)([0-9](?:[0-9]|(?<=[0-9a-fA-F])'(?=[0-9a-fA-F]))*))?([lLfF](?!\\w))?((?:\\w(?<![0-9eE])\\w*)?$)",
              captures: {
                1: {
                  name: "constant.numeric.decimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                2: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                3: {
                  name: "constant.numeric.decimal.point.cuda-cpp"
                },
                4: {
                  name: "constant.numeric.decimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                5: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                6: {
                  name: "keyword.other.unit.exponent.decimal.cuda-cpp"
                },
                7: {
                  name: "keyword.operator.plus.exponent.decimal.cuda-cpp"
                },
                8: {
                  name: "keyword.operator.minus.exponent.decimal.cuda-cpp"
                },
                9: {
                  name: "constant.numeric.exponent.decimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                10: {
                  name: "keyword.other.unit.suffix.floating-point.cuda-cpp"
                },
                11: {
                  name: "keyword.other.unit.user-defined.cuda-cpp"
                }
              }
            }, {
              match: "(\\G0[bB])([01](?:[01]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)((?:[uU]|(?:[uU]ll?)|(?:[uU]LL?)|(?:ll?[uU]?)|(?:LL?[uU]?)|[fF])(?!\\w))?((?:\\w(?<![0-9])\\w*)?$)",
              captures: {
                1: {
                  name: "keyword.other.unit.binary.cuda-cpp"
                },
                2: {
                  name: "constant.numeric.binary.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                3: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                4: {
                  name: "keyword.other.unit.suffix.integer.cuda-cpp"
                },
                5: {
                  name: "keyword.other.unit.user-defined.cuda-cpp"
                }
              }
            }, {
              match: "(\\G0)((?:[0-7]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))+)((?:[uU]|(?:[uU]ll?)|(?:[uU]LL?)|(?:ll?[uU]?)|(?:LL?[uU]?)|[fF])(?!\\w))?((?:\\w(?<![0-9])\\w*)?$)",
              captures: {
                1: {
                  name: "keyword.other.unit.octal.cuda-cpp"
                },
                2: {
                  name: "constant.numeric.octal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                3: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                4: {
                  name: "keyword.other.unit.suffix.integer.cuda-cpp"
                },
                5: {
                  name: "keyword.other.unit.user-defined.cuda-cpp"
                }
              }
            }, {
              match: "(\\G0[xX])([0-9a-fA-F](?:[0-9a-fA-F]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)(?:(?<!')([pP])((?:\\+)?)((?:\\-)?)([0-9](?:[0-9]|(?<=[0-9a-fA-F])'(?=[0-9a-fA-F]))*))?((?:[uU]|(?:[uU]ll?)|(?:[uU]LL?)|(?:ll?[uU]?)|(?:LL?[uU]?)|[fF])(?!\\w))?((?:\\w(?<![0-9a-fA-FpP])\\w*)?$)",
              captures: {
                1: {
                  name: "keyword.other.unit.hexadecimal.cuda-cpp"
                },
                2: {
                  name: "constant.numeric.hexadecimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                3: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                4: {
                  name: "keyword.other.unit.exponent.hexadecimal.cuda-cpp"
                },
                5: {
                  name: "keyword.operator.plus.exponent.hexadecimal.cuda-cpp"
                },
                6: {
                  name: "keyword.operator.minus.exponent.hexadecimal.cuda-cpp"
                },
                7: {
                  name: "constant.numeric.exponent.hexadecimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                8: {
                  name: "keyword.other.unit.suffix.integer.cuda-cpp"
                },
                9: {
                  name: "keyword.other.unit.user-defined.cuda-cpp"
                }
              }
            }, {
              match: "\\G(?=[0-9.])(?!0[xXbB])([0-9](?:[0-9]|((?<=[0-9a-fA-F])'(?=[0-9a-fA-F])))*)(?:(?<!')([eE])((?:\\+)?)((?:\\-)?)([0-9](?:[0-9]|(?<=[0-9a-fA-F])'(?=[0-9a-fA-F]))*))?((?:[uU]|(?:[uU]ll?)|(?:[uU]LL?)|(?:ll?[uU]?)|(?:LL?[uU]?)|[fF])(?!\\w))?((?:\\w(?<![0-9eE])\\w*)?$)",
              captures: {
                1: {
                  name: "constant.numeric.decimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                2: {
                  name: "punctuation.separator.constant.numeric.cuda-cpp"
                },
                3: {
                  name: "keyword.other.unit.exponent.decimal.cuda-cpp"
                },
                4: {
                  name: "keyword.operator.plus.exponent.decimal.cuda-cpp"
                },
                5: {
                  name: "keyword.operator.minus.exponent.decimal.cuda-cpp"
                },
                6: {
                  name: "constant.numeric.exponent.decimal.cuda-cpp",
                  patterns: [{
                    match: "(?<=[0-9a-fA-F])'(?=[0-9a-fA-F])",
                    name: "punctuation.separator.constant.numeric.cuda-cpp"
                  }]
                },
                7: {
                  name: "keyword.other.unit.suffix.integer.cuda-cpp"
                },
                8: {
                  name: "keyword.other.unit.user-defined.cuda-cpp"
                }
              }
            }, {
              match: "(?:(?:[0-9a-zA-Z_\\.]|')|(?<=[eEpP])[+-])+",
              name: "invalid.illegal.constant.numeric.cuda-cpp"
            }]
          }]
        }
      }
    },
    operator_overload: {
      begin: `(?:(\\s*+((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:(?:unsigned)|(?:signed)|(?:short)|(?:long))|(?:(?:struct)|(?:class)|(?:union)|(?:enum)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<55>?)+>)(?:\\s)*+)?::)*+)?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?!(?:(?:transaction_safe_dynamic)|(?:__has_cpp_attribute)|(?:reinterpret_cast)|(?:transaction_safe)|(?:__forceinline__)|(?:atomic_noexcept)|(?:__has_include)|(?:atomic_cancel)|(?:atomic_commit)|(?:dynamic_cast)|(?:__constant__)|(?:__restrict__)|(?:__noinline__)|(?:thread_local)|(?:synchronized)|(?:static_cast)|(?:__managed__)|(?:const_cast)|(?:__shared__)|(?:__global__)|(?:__device__)|(?:co_return)|(?:constexpr)|(?:constexpr)|(?:constexpr)|(?:consteval)|(?:protected)|(?:threadIdx)|(?:namespace)|(?:co_return)|(?:noexcept)|(?:noexcept)|(?:continue)|(?:co_await)|(?:co_yield)|(?:volatile)|(?:register)|(?:restrict)|(?:explicit)|(?:__host__)|(?:override)|(?:volatile)|(?:noexcept)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:template)|(?:operator)|(?:decltype)|(?:typename)|(?:requires)|(?:co_await)|(?:co_yield)|(?:reflexpr)|(?:alignof)|(?:alignas)|(?:default)|(?:nullptr)|(?:mutable)|(?:virtual)|(?:mutable)|(?:private)|(?:include)|(?:warning)|(?:_Pragma)|(?:defined)|(?:gridDim)|(?:typedef)|(?:__asm__)|(?:concept)|(?:sizeof)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:typeid)|(?:switch)|(?:return)|(?:static)|(?:extern)|(?:inline)|(?:friend)|(?:public)|(?:ifndef)|(?:define)|(?:pragma)|(?:export)|(?:import)|(?:module)|(?:compl)|(?:bitor)|(?:throw)|(?:or_eq)|(?:while)|(?:catch)|(?:break)|(?:false)|(?:const)|(?:final)|(?:const)|(?:endif)|(?:ifdef)|(?:undef)|(?:error)|(?:using)|(?:audit)|(?:axiom)|(?:else)|(?:goto)|(?:case)|(?:NULL)|(?:true)|(?:elif)|(?:else)|(?:line)|(?:this)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:for)|(?:try)|(?:asm)|(?:or)|(?:do)|(?:if)|(?:if))\\b)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<55>?)+>)?(?![\\w<:.]))(((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:__cdecl|__clrcall|__stdcall|__fastcall|__thiscall|__vectorcall)?)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<55>?)+>)(?:\\s)*+)?::)*+)(operator)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<55>?)+>)(?:\\s)*+)?::)*+)(?:(?:((?:(?:delete\\[\\])|(?:delete)|(?:new\\[\\])|(?:new)|(?:\\->\\*)|(?:<<=)|(?:>>=)|(?:<=>)|(?:\\+\\+)|(?:\\-\\-)|(?:\\(\\))|(?:\\[\\])|(?:\\->)|(?:\\+\\+)|(?:\\-\\-)|(?:<<)|(?:>>)|(?:<=)|(?:>=)|(?:==)|(?:!=)|(?:&&)|(?:\\|\\|)|(?:\\+=)|(?:\\-=)|(?:\\*=)|(?:\\/=)|(?:%=)|(?:&=)|(?:\\^=)|(?:\\|=)|(?:\\+)|(?:\\-)|!|~|(?:\\*)|&|(?:\\*)|(?:\\/)|%|(?:\\+)|(?:\\-)|<|>|&|(?:\\^)|(?:\\|)|=|,))|((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)(((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:\\[\\])?)))|("")((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\<|\\()`,
      end: "(?:(?<=\\}|%>|\\?\\?>)|(?=[;>\\[\\]=]))",
      beginCaptures: {
        0: {
          name: "meta.head.function.definition.special.operator-overload.cuda-cpp"
        },
        1: {
          name: "meta.qualified_type.cuda-cpp",
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:(?:struct)|(?:class)|(?:union)|(?:enum))(?!\\w)",
            name: "storage.type.$0.cuda-cpp"
          }, {
            include: "#attributes_context"
          }, {
            include: "#storage_types"
          }, {
            include: "#number_literal"
          }, {
            include: "#string_context"
          }, {
            include: "#comma"
          }, {
            include: "#scope_resolution_inner_generated"
          }, {
            begin: "<",
            end: ">",
            beginCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
              }
            },
            name: "meta.template.call.cuda-cpp",
            patterns: [{
              include: "#template_call_context"
            }]
          }, {
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.type.cuda-cpp"
          }]
        },
        2: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        3: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        4: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        5: {
          name: "comment.block.cuda-cpp"
        },
        6: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        7: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        8: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        9: {
          name: "comment.block.cuda-cpp"
        },
        10: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        11: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.type.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.type.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        12: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        13: {},
        14: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        15: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        16: {
          name: "comment.block.cuda-cpp"
        },
        17: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        18: {},
        19: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        20: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        21: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        22: {
          name: "comment.block.cuda-cpp"
        },
        23: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        24: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        25: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        26: {
          name: "comment.block.cuda-cpp"
        },
        27: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        28: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        29: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        30: {
          name: "comment.block.cuda-cpp"
        },
        31: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        32: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        33: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        34: {
          name: "comment.block.cuda-cpp"
        },
        35: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        36: {
          name: "storage.type.modifier.calling-convention.cuda-cpp"
        },
        37: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        38: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        39: {
          name: "comment.block.cuda-cpp"
        },
        40: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        41: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        42: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        43: {
          name: "comment.block.cuda-cpp"
        },
        44: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        45: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.operator.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.operator.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        46: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        47: {},
        48: {
          name: "keyword.other.operator.overload.cuda-cpp"
        },
        49: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        50: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        51: {
          name: "comment.block.cuda-cpp"
        },
        52: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        53: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.operator-overload.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.operator-overload.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        54: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        55: {},
        56: {
          name: "entity.name.operator.cuda-cpp"
        },
        57: {
          name: "entity.name.operator.type.cuda-cpp"
        },
        58: {
          patterns: [{
            match: "\\*",
            name: "entity.name.operator.type.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "entity.name.operator.type.reference.cuda-cpp"
          }]
        },
        59: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        60: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        61: {
          name: "comment.block.cuda-cpp"
        },
        62: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        63: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        64: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        65: {
          name: "comment.block.cuda-cpp"
        },
        66: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        67: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        68: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        69: {
          name: "comment.block.cuda-cpp"
        },
        70: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        71: {
          name: "entity.name.operator.type.array.cuda-cpp"
        },
        72: {
          name: "entity.name.operator.custom-literal.cuda-cpp"
        },
        73: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        74: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        75: {
          name: "comment.block.cuda-cpp"
        },
        76: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        77: {
          name: "entity.name.operator.custom-literal.cuda-cpp"
        },
        78: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        79: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        80: {
          name: "comment.block.cuda-cpp"
        },
        81: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        }
      },
      endCaptures: {},
      name: "meta.function.definition.special.operator-overload.cuda-cpp",
      patterns: [{
        begin: "\\G ?",
        end: "(?:\\{|<%|\\?\\?<|(?=;))",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.function.definition.special.operator-overload.cuda-cpp"
          }
        },
        name: "meta.head.function.definition.special.operator-overload.cuda-cpp",
        patterns: [{
          include: "#ever_present_context"
        }, {
          include: "#template_call_range"
        }, {
          begin: "\\(",
          end: "\\)",
          beginCaptures: {
            0: {
              name: "punctuation.section.parameters.begin.bracket.round.special.operator-overload.cuda-cpp"
            }
          },
          endCaptures: {
            0: {
              name: "punctuation.section.parameters.end.bracket.round.special.operator-overload.cuda-cpp"
            }
          },
          contentName: "meta.function.definition.parameters.special.operator-overload",
          patterns: [{
            include: "#function_parameter_context"
          }, {
            include: "#evaluation_context"
          }]
        }, {
          include: "#qualifiers_and_specifiers_post_parameters"
        }, {
          include: "$self"
        }]
      }, {
        begin: "(?<=\\{|<%|\\?\\?<)",
        end: "\\}|%>|\\?\\?>",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.function.definition.special.operator-overload.cuda-cpp"
          }
        },
        name: "meta.body.function.definition.special.operator-overload.cuda-cpp",
        patterns: [{
          include: "#function_body_context"
        }]
      }, {
        begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
        end: "[\\s]*(?=;)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.tail.function.definition.special.operator-overload.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }]
    },
    operators: {
      patterns: [{
        begin: "((?<!\\w)sizeof(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
        end: "\\)",
        beginCaptures: {
          1: {
            name: "keyword.operator.functionlike.cuda-cpp keyword.operator.sizeof.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          4: {
            name: "comment.block.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          6: {
            name: "punctuation.section.arguments.begin.bracket.round.operator.sizeof.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.section.arguments.end.bracket.round.operator.sizeof.cuda-cpp"
          }
        },
        contentName: "meta.arguments.operator.sizeof",
        patterns: [{
          include: "#evaluation_context"
        }]
      }, {
        begin: "((?<!\\w)alignof(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
        end: "\\)",
        beginCaptures: {
          1: {
            name: "keyword.operator.functionlike.cuda-cpp keyword.operator.alignof.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          4: {
            name: "comment.block.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          6: {
            name: "punctuation.section.arguments.begin.bracket.round.operator.alignof.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.section.arguments.end.bracket.round.operator.alignof.cuda-cpp"
          }
        },
        contentName: "meta.arguments.operator.alignof",
        patterns: [{
          include: "#evaluation_context"
        }]
      }, {
        begin: "((?<!\\w)alignas(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
        end: "\\)",
        beginCaptures: {
          1: {
            name: "keyword.operator.functionlike.cuda-cpp keyword.operator.alignas.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          4: {
            name: "comment.block.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          6: {
            name: "punctuation.section.arguments.begin.bracket.round.operator.alignas.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.section.arguments.end.bracket.round.operator.alignas.cuda-cpp"
          }
        },
        contentName: "meta.arguments.operator.alignas",
        patterns: [{
          include: "#evaluation_context"
        }]
      }, {
        begin: "((?<!\\w)typeid(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
        end: "\\)",
        beginCaptures: {
          1: {
            name: "keyword.operator.functionlike.cuda-cpp keyword.operator.typeid.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          4: {
            name: "comment.block.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          6: {
            name: "punctuation.section.arguments.begin.bracket.round.operator.typeid.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.section.arguments.end.bracket.round.operator.typeid.cuda-cpp"
          }
        },
        contentName: "meta.arguments.operator.typeid",
        patterns: [{
          include: "#evaluation_context"
        }]
      }, {
        begin: "((?<!\\w)noexcept(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
        end: "\\)",
        beginCaptures: {
          1: {
            name: "keyword.operator.functionlike.cuda-cpp keyword.operator.noexcept.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          4: {
            name: "comment.block.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          6: {
            name: "punctuation.section.arguments.begin.bracket.round.operator.noexcept.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.section.arguments.end.bracket.round.operator.noexcept.cuda-cpp"
          }
        },
        contentName: "meta.arguments.operator.noexcept",
        patterns: [{
          include: "#evaluation_context"
        }]
      }, {
        begin: "(\\bsizeof\\.\\.\\.)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
        end: "\\)",
        beginCaptures: {
          1: {
            name: "keyword.operator.functionlike.cuda-cpp keyword.operator.sizeof.variadic.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          4: {
            name: "comment.block.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          6: {
            name: "punctuation.section.arguments.begin.bracket.round.operator.sizeof.variadic.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.section.arguments.end.bracket.round.operator.sizeof.variadic.cuda-cpp"
          }
        },
        contentName: "meta.arguments.operator.sizeof.variadic",
        patterns: [{
          include: "#evaluation_context"
        }]
      }, {
        match: "--",
        name: "keyword.operator.decrement.cuda-cpp"
      }, {
        match: "\\+\\+",
        name: "keyword.operator.increment.cuda-cpp"
      }, {
        match: "%=|\\+=|-=|\\*=|(?<!\\()\\/=",
        name: "keyword.operator.assignment.compound.cuda-cpp"
      }, {
        match: "&=|\\^=|<<=|>>=|\\|=",
        name: "keyword.operator.assignment.compound.bitwise.cuda-cpp"
      }, {
        match: "<<|>>",
        name: "keyword.operator.bitwise.shift.cuda-cpp"
      }, {
        match: "!=|<=|>=|==|<|>",
        name: "keyword.operator.comparison.cuda-cpp"
      }, {
        match: "&&|!|\\|\\|",
        name: "keyword.operator.logical.cuda-cpp"
      }, {
        match: "&|\\||\\^|~",
        name: "keyword.operator.cuda-cpp"
      }, {
        include: "#assignment_operator"
      }, {
        match: "%|\\*|\\/|-|\\+",
        name: "keyword.operator.cuda-cpp"
      }, {
        include: "#ternary_operator"
      }]
    },
    over_qualified_types: {
      patterns: [{
        match: "(struct)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))?)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:\\[((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\]((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=,|\\)|\\n)",
        captures: {
          1: {
            name: "storage.type.struct.parameter.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          4: {
            name: "entity.name.type.struct.parameter.cuda-cpp"
          },
          5: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          6: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          7: {
            patterns: [{
              match: "\\*",
              name: "storage.modifier.pointer.cuda-cpp"
            }, {
              match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
              captures: {
                1: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                2: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                3: {
                  name: "comment.block.cuda-cpp"
                },
                4: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              },
              name: "invalid.illegal.reference-type.cuda-cpp"
            }, {
              match: "\\&",
              name: "storage.modifier.reference.cuda-cpp"
            }]
          },
          8: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          9: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          10: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          11: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          12: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          13: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          14: {
            name: "variable.other.object.declare.cuda-cpp"
          },
          15: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          16: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          17: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          18: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          19: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          20: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          }
        }
      }, {
        match: "(enum)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))?)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:\\[((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\]((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=,|\\)|\\n)",
        captures: {
          1: {
            name: "storage.type.enum.parameter.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          4: {
            name: "entity.name.type.enum.parameter.cuda-cpp"
          },
          5: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          6: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          7: {
            patterns: [{
              match: "\\*",
              name: "storage.modifier.pointer.cuda-cpp"
            }, {
              match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
              captures: {
                1: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                2: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                3: {
                  name: "comment.block.cuda-cpp"
                },
                4: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              },
              name: "invalid.illegal.reference-type.cuda-cpp"
            }, {
              match: "\\&",
              name: "storage.modifier.reference.cuda-cpp"
            }]
          },
          8: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          9: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          10: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          11: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          12: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          13: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          14: {
            name: "variable.other.object.declare.cuda-cpp"
          },
          15: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          16: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          17: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          18: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          19: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          20: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          }
        }
      }, {
        match: "(union)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))?)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:\\[((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\]((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=,|\\)|\\n)",
        captures: {
          1: {
            name: "storage.type.union.parameter.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          4: {
            name: "entity.name.type.union.parameter.cuda-cpp"
          },
          5: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          6: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          7: {
            patterns: [{
              match: "\\*",
              name: "storage.modifier.pointer.cuda-cpp"
            }, {
              match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
              captures: {
                1: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                2: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                3: {
                  name: "comment.block.cuda-cpp"
                },
                4: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              },
              name: "invalid.illegal.reference-type.cuda-cpp"
            }, {
              match: "\\&",
              name: "storage.modifier.reference.cuda-cpp"
            }]
          },
          8: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          9: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          10: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          11: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          12: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          13: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          14: {
            name: "variable.other.object.declare.cuda-cpp"
          },
          15: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          16: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          17: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          18: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          19: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          20: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          }
        }
      }, {
        match: "(class)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))?)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:\\[((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\]((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=,|\\)|\\n)",
        captures: {
          1: {
            name: "storage.type.class.parameter.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          4: {
            name: "entity.name.type.class.parameter.cuda-cpp"
          },
          5: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          6: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          7: {
            patterns: [{
              match: "\\*",
              name: "storage.modifier.pointer.cuda-cpp"
            }, {
              match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
              captures: {
                1: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                2: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                3: {
                  name: "comment.block.cuda-cpp"
                },
                4: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              },
              name: "invalid.illegal.reference-type.cuda-cpp"
            }, {
              match: "\\&",
              name: "storage.modifier.reference.cuda-cpp"
            }]
          },
          8: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          9: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          10: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          11: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          12: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          13: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          14: {
            name: "variable.other.object.declare.cuda-cpp"
          },
          15: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          16: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          17: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          18: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          19: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          20: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          }
        }
      }]
    },
    parameter: {
      begin: "((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\w)",
      end: "(?:(?=\\))|(,))",
      beginCaptures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        }
      },
      endCaptures: {
        1: {
          name: "punctuation.separator.delimiter.comma.cuda-cpp"
        }
      },
      name: "meta.parameter.cuda-cpp",
      patterns: [{
        include: "#ever_present_context"
      }, {
        include: "#function_pointer_parameter"
      }, {
        include: "#decltype"
      }, {
        include: "#vararg_ellipses"
      }, {
        match: "((?:((?:(?:__constant__)|(?:__restrict__)|(?:__managed__)|(?:__shared__)|(?:volatile)|(?:register)|(?:restrict)|(?:static)|(?:extern)|(?:const)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))+)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:\\s)*+(?<!\\w)(?:(?:(?:((?:(?:threadIdx)|(?:unsigned)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:wchar_t)|(?:gridDim)|(?:signed)|(?:double)|(?:short)|(?:float)|(?:auto)|(?:void)|(?:char)|(?:long)|(?:bool)|(?:int)))|((?:(?:uint_least16_t)|(?:uint_least32_t)|(?:uint_least64_t)|(?:int_least16_t)|(?:int_least32_t)|(?:int_least64_t)|(?:uint_least8_t)|(?:uint_fast16_t)|(?:uint_fast32_t)|(?:uint_fast64_t)|(?:int_least8_t)|(?:int_fast16_t)|(?:int_fast32_t)|(?:int_fast64_t)|(?:uint_fast8_t)|(?:suseconds_t)|(?:int_fast8_t)|(?:useconds_t)|(?:ulonglong1)|(?:ulonglong2)|(?:ulonglong3)|(?:ulonglong4)|(?:blksize_t)|(?:in_addr_t)|(?:in_port_t)|(?:uintptr_t)|(?:uintmax_t)|(?:uintmax_t)|(?:uintmax_t)|(?:longlong1)|(?:longlong2)|(?:longlong3)|(?:longlong4)|(?:u_quad_t)|(?:blkcnt_t)|(?:uint16_t)|(?:uint32_t)|(?:uint64_t)|(?:intptr_t)|(?:intmax_t)|(?:intmax_t)|(?:u_short)|(?:qaddr_t)|(?:caddr_t)|(?:daddr_t)|(?:fixpt_t)|(?:nlink_t)|(?:segsz_t)|(?:swblk_t)|(?:clock_t)|(?:ssize_t)|(?:int16_t)|(?:int32_t)|(?:int64_t)|(?:uint8_t)|(?:ushort1)|(?:ushort2)|(?:ushort3)|(?:ushort4)|(?:double1)|(?:double2)|(?:double3)|(?:double4)|(?:u_char)|(?:u_long)|(?:ushort)|(?:quad_t)|(?:mode_t)|(?:size_t)|(?:time_t)|(?:int8_t)|(?:uchar1)|(?:uchar2)|(?:uchar3)|(?:uchar4)|(?:short1)|(?:short2)|(?:short3)|(?:short4)|(?:ulong4)|(?:ulong1)|(?:ulong2)|(?:ulong3)|(?:ulong4)|(?:float1)|(?:float2)|(?:float3)|(?:float4)|(?:u_int)|(?:div_t)|(?:dev_t)|(?:gid_t)|(?:ino_t)|(?:key_t)|(?:pid_t)|(?:off_t)|(?:uid_t)|(?:char1)|(?:char2)|(?:char3)|(?:char4)|(?:uint1)|(?:uint2)|(?:uint3)|(?:uint4)|(?:long1)|(?:long2)|(?:long3)|(?:uint)|(?:id_t)|(?:id_t)|(?:int1)|(?:int2)|(?:int3)|(?:int4)|(?:dim3))))|((?:(?:pthread_rwlockattr_t)|(?:pthread_mutexattr_t)|(?:pthread_condattr_t)|(?:pthread_rwlock_t)|(?:pthread_mutex_t)|(?:pthread_attr_t)|(?:pthread_cond_t)|(?:pthread_once_t)|(?:pthread_key_t)|(?:pthread_t))))|([a-zA-Z_](?:\\w)*_t))(?!\\w)|((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\b\\b(?<!\\W__constant__|^__constant__|\\W__restrict__|^__restrict__|\\W__managed__|^__managed__|\\W__shared__|^__shared__|\\Wvolatile|^volatile|\\Wregister|^register|\\Wrestrict|^restrict|\\Wstatic|^static|\\Wextern|^extern|\\Wconst|^const)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=,|\\)|=)",
        captures: {
          1: {
            patterns: [{
              include: "#storage_types"
            }]
          },
          2: {
            name: "storage.modifier.specifier.parameter.cuda-cpp"
          },
          3: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          4: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          5: {
            name: "comment.block.cuda-cpp"
          },
          6: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          7: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          8: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          9: {
            name: "comment.block.cuda-cpp"
          },
          10: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          11: {
            name: "storage.type.primitive.cuda-cpp storage.type.built-in.primitive.cuda-cpp"
          },
          12: {
            name: "storage.type.cuda-cpp storage.type.built-in.cuda-cpp"
          },
          13: {
            name: "support.type.posix-reserved.pthread.cuda-cpp support.type.built-in.posix-reserved.pthread.cuda-cpp"
          },
          14: {
            name: "support.type.posix-reserved.cuda-cpp support.type.built-in.posix-reserved.cuda-cpp"
          },
          15: {
            name: "entity.name.type.parameter.cuda-cpp"
          },
          16: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          17: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          18: {
            name: "comment.block.cuda-cpp"
          },
          19: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          }
        }
      }, {
        include: "#storage_types"
      }, {
        include: "#scope_resolution_parameter_inner_generated"
      }, {
        match: "(?:(?:struct)|(?:class)|(?:union)|(?:enum))",
        name: "storage.type.$0.cuda-cpp"
      }, {
        begin: "(?<==)",
        end: "(?:(?=\\))|(,))",
        beginCaptures: {},
        endCaptures: {
          1: {
            name: "punctuation.separator.delimiter.comma.cuda-cpp"
          }
        },
        patterns: [{
          include: "#evaluation_context"
        }]
      }, {
        match: "\\=",
        name: "keyword.operator.assignment.cuda-cpp"
      }, {
        match: "(?<!\\s|\\(|,|:)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\)|,|\\[|=|\\n)",
        captures: {
          1: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          2: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          3: {
            name: "comment.block.cuda-cpp"
          },
          4: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          5: {
            name: "variable.parameter.cuda-cpp"
          },
          6: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          7: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          8: {
            name: "comment.block.cuda-cpp"
          },
          9: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          }
        }
      }, {
        include: "#attributes_context"
      }, {
        begin: "\\[",
        end: "\\]",
        beginCaptures: {
          0: {
            name: "punctuation.definition.begin.bracket.square.array.type.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.definition.end.bracket.square.array.type.cuda-cpp"
          }
        },
        name: "meta.bracket.square.array.cuda-cpp",
        patterns: [{
          include: "#evaluation_context"
        }]
      }, {
        match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b(?<!\\Wstruct|^struct|\\Wclass|^class|\\Wunion|^union|\\Wenum|^enum)",
        name: "entity.name.type.parameter.cuda-cpp"
      }, {
        include: "#template_call_range"
      }, {
        match: "((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*))",
        captures: {
          0: {
            patterns: [{
              match: "\\*",
              name: "storage.modifier.pointer.cuda-cpp"
            }, {
              match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
              captures: {
                1: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                2: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                3: {
                  name: "comment.block.cuda-cpp"
                },
                4: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              },
              name: "invalid.illegal.reference-type.cuda-cpp"
            }, {
              match: "\\&",
              name: "storage.modifier.reference.cuda-cpp"
            }]
          },
          1: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          2: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          3: {
            name: "comment.block.cuda-cpp"
          },
          4: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          5: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          6: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          7: {
            name: "comment.block.cuda-cpp"
          },
          8: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          }
        }
      }]
    },
    parameter_class: {
      match: "(class)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))?)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:\\[((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\]((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=,|\\)|\\n)",
      captures: {
        1: {
          name: "storage.type.class.parameter.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        4: {
          name: "entity.name.type.class.parameter.cuda-cpp"
        },
        5: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        6: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        7: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        8: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        9: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        10: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        11: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        12: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        13: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        14: {
          name: "variable.other.object.declare.cuda-cpp"
        },
        15: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        16: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        17: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        18: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        19: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        20: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      }
    },
    parameter_enum: {
      match: "(enum)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))?)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:\\[((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\]((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=,|\\)|\\n)",
      captures: {
        1: {
          name: "storage.type.enum.parameter.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        4: {
          name: "entity.name.type.enum.parameter.cuda-cpp"
        },
        5: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        6: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        7: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        8: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        9: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        10: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        11: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        12: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        13: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        14: {
          name: "variable.other.object.declare.cuda-cpp"
        },
        15: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        16: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        17: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        18: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        19: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        20: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      }
    },
    parameter_or_maybe_value: {
      begin: "((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\w)",
      end: "(?:(?=\\))|(,))",
      beginCaptures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        }
      },
      endCaptures: {
        1: {
          name: "punctuation.separator.delimiter.comma.cuda-cpp"
        }
      },
      name: "meta.parameter.cuda-cpp",
      patterns: [{
        include: "#ever_present_context"
      }, {
        include: "#function_pointer_parameter"
      }, {
        include: "#memory_operators"
      }, {
        include: "#builtin_storage_type_initilizer"
      }, {
        include: "#curly_initializer"
      }, {
        include: "#decltype"
      }, {
        include: "#vararg_ellipses"
      }, {
        match: "((?:((?:(?:__constant__)|(?:__restrict__)|(?:__managed__)|(?:__shared__)|(?:volatile)|(?:register)|(?:restrict)|(?:static)|(?:extern)|(?:const)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))+)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:\\s)*+(?<!\\w)(?:(?:(?:((?:(?:threadIdx)|(?:unsigned)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:wchar_t)|(?:gridDim)|(?:signed)|(?:double)|(?:short)|(?:float)|(?:auto)|(?:void)|(?:char)|(?:long)|(?:bool)|(?:int)))|((?:(?:uint_least16_t)|(?:uint_least32_t)|(?:uint_least64_t)|(?:int_least16_t)|(?:int_least32_t)|(?:int_least64_t)|(?:uint_least8_t)|(?:uint_fast16_t)|(?:uint_fast32_t)|(?:uint_fast64_t)|(?:int_least8_t)|(?:int_fast16_t)|(?:int_fast32_t)|(?:int_fast64_t)|(?:uint_fast8_t)|(?:suseconds_t)|(?:int_fast8_t)|(?:useconds_t)|(?:ulonglong1)|(?:ulonglong2)|(?:ulonglong3)|(?:ulonglong4)|(?:blksize_t)|(?:in_addr_t)|(?:in_port_t)|(?:uintptr_t)|(?:uintmax_t)|(?:uintmax_t)|(?:uintmax_t)|(?:longlong1)|(?:longlong2)|(?:longlong3)|(?:longlong4)|(?:u_quad_t)|(?:blkcnt_t)|(?:uint16_t)|(?:uint32_t)|(?:uint64_t)|(?:intptr_t)|(?:intmax_t)|(?:intmax_t)|(?:u_short)|(?:qaddr_t)|(?:caddr_t)|(?:daddr_t)|(?:fixpt_t)|(?:nlink_t)|(?:segsz_t)|(?:swblk_t)|(?:clock_t)|(?:ssize_t)|(?:int16_t)|(?:int32_t)|(?:int64_t)|(?:uint8_t)|(?:ushort1)|(?:ushort2)|(?:ushort3)|(?:ushort4)|(?:double1)|(?:double2)|(?:double3)|(?:double4)|(?:u_char)|(?:u_long)|(?:ushort)|(?:quad_t)|(?:mode_t)|(?:size_t)|(?:time_t)|(?:int8_t)|(?:uchar1)|(?:uchar2)|(?:uchar3)|(?:uchar4)|(?:short1)|(?:short2)|(?:short3)|(?:short4)|(?:ulong4)|(?:ulong1)|(?:ulong2)|(?:ulong3)|(?:ulong4)|(?:float1)|(?:float2)|(?:float3)|(?:float4)|(?:u_int)|(?:div_t)|(?:dev_t)|(?:gid_t)|(?:ino_t)|(?:key_t)|(?:pid_t)|(?:off_t)|(?:uid_t)|(?:char1)|(?:char2)|(?:char3)|(?:char4)|(?:uint1)|(?:uint2)|(?:uint3)|(?:uint4)|(?:long1)|(?:long2)|(?:long3)|(?:uint)|(?:id_t)|(?:id_t)|(?:int1)|(?:int2)|(?:int3)|(?:int4)|(?:dim3))))|((?:(?:pthread_rwlockattr_t)|(?:pthread_mutexattr_t)|(?:pthread_condattr_t)|(?:pthread_rwlock_t)|(?:pthread_mutex_t)|(?:pthread_attr_t)|(?:pthread_cond_t)|(?:pthread_once_t)|(?:pthread_key_t)|(?:pthread_t))))|([a-zA-Z_](?:\\w)*_t))(?!\\w)|((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\b\\b(?<!\\W__constant__|^__constant__|\\W__restrict__|^__restrict__|\\W__managed__|^__managed__|\\W__shared__|^__shared__|\\Wvolatile|^volatile|\\Wregister|^register|\\Wrestrict|^restrict|\\Wstatic|^static|\\Wextern|^extern|\\Wconst|^const)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=,|\\)|=)",
        captures: {
          1: {
            patterns: [{
              include: "#storage_types"
            }]
          },
          2: {
            name: "storage.modifier.specifier.parameter.cuda-cpp"
          },
          3: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          4: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          5: {
            name: "comment.block.cuda-cpp"
          },
          6: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          7: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          8: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          9: {
            name: "comment.block.cuda-cpp"
          },
          10: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          11: {
            name: "storage.type.primitive.cuda-cpp storage.type.built-in.primitive.cuda-cpp"
          },
          12: {
            name: "storage.type.cuda-cpp storage.type.built-in.cuda-cpp"
          },
          13: {
            name: "support.type.posix-reserved.pthread.cuda-cpp support.type.built-in.posix-reserved.pthread.cuda-cpp"
          },
          14: {
            name: "support.type.posix-reserved.cuda-cpp support.type.built-in.posix-reserved.cuda-cpp"
          },
          15: {
            name: "entity.name.type.parameter.cuda-cpp"
          },
          16: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          17: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          18: {
            name: "comment.block.cuda-cpp"
          },
          19: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          }
        }
      }, {
        include: "#storage_types"
      }, {
        include: "#function_call"
      }, {
        include: "#scope_resolution_parameter_inner_generated"
      }, {
        match: "(?:(?:struct)|(?:class)|(?:union)|(?:enum))",
        name: "storage.type.$0.cuda-cpp"
      }, {
        begin: "(?<==)",
        end: "(?:(?=\\))|(,))",
        beginCaptures: {},
        endCaptures: {
          1: {
            name: "punctuation.separator.delimiter.comma.cuda-cpp"
          }
        },
        patterns: [{
          include: "#evaluation_context"
        }]
      }, {
        match: "(?<!\\s|\\(|,|:)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=(?:\\)|,|\\[|=|\\/\\/|(?:(?:\\n)|$)))",
        captures: {
          1: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          2: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          3: {
            name: "comment.block.cuda-cpp"
          },
          4: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          5: {
            name: "variable.parameter.cuda-cpp"
          },
          6: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          7: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          8: {
            name: "comment.block.cuda-cpp"
          },
          9: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          }
        }
      }, {
        include: "#attributes_context"
      }, {
        begin: "\\[",
        end: "\\]",
        beginCaptures: {
          0: {
            name: "punctuation.definition.begin.bracket.square.array.type.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.definition.end.bracket.square.array.type.cuda-cpp"
          }
        },
        name: "meta.bracket.square.array.cuda-cpp",
        patterns: [{
          include: "#evaluation_context"
        }]
      }, {
        match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b(?<!\\Wstruct|^struct|\\Wclass|^class|\\Wunion|^union|\\Wenum|^enum)",
        name: "entity.name.type.parameter.cuda-cpp"
      }, {
        include: "#template_call_range"
      }, {
        match: "((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*))",
        captures: {
          0: {
            patterns: [{
              match: "\\*",
              name: "storage.modifier.pointer.cuda-cpp"
            }, {
              match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
              captures: {
                1: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                2: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                3: {
                  name: "comment.block.cuda-cpp"
                },
                4: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              },
              name: "invalid.illegal.reference-type.cuda-cpp"
            }, {
              match: "\\&",
              name: "storage.modifier.reference.cuda-cpp"
            }]
          },
          1: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          2: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          3: {
            name: "comment.block.cuda-cpp"
          },
          4: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          5: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          6: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          7: {
            name: "comment.block.cuda-cpp"
          },
          8: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          }
        }
      }, {
        include: "#evaluation_context"
      }]
    },
    parameter_struct: {
      match: "(struct)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))?)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:\\[((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\]((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=,|\\)|\\n)",
      captures: {
        1: {
          name: "storage.type.struct.parameter.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        4: {
          name: "entity.name.type.struct.parameter.cuda-cpp"
        },
        5: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        6: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        7: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        8: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        9: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        10: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        11: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        12: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        13: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        14: {
          name: "variable.other.object.declare.cuda-cpp"
        },
        15: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        16: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        17: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        18: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        19: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        20: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      }
    },
    parameter_union: {
      match: "(union)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))?)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:\\[((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\]((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=,|\\)|\\n)",
      captures: {
        1: {
          name: "storage.type.union.parameter.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        4: {
          name: "entity.name.type.union.parameter.cuda-cpp"
        },
        5: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        6: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        7: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        8: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        9: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        10: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        11: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        12: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        13: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        14: {
          name: "variable.other.object.declare.cuda-cpp"
        },
        15: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        16: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        17: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        18: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        19: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        20: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      }
    },
    parentheses: {
      begin: "\\(",
      end: "\\)",
      beginCaptures: {
        0: {
          name: "punctuation.section.parens.begin.bracket.round.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.parens.end.bracket.round.cuda-cpp"
        }
      },
      name: "meta.parens.cuda-cpp",
      patterns: [{
        include: "#over_qualified_types"
      }, {
        match: "(?<!:):(?!:)",
        name: "punctuation.separator.colon.range-based.cuda-cpp"
      }, {
        include: "#evaluation_context"
      }]
    },
    pragma: {
      begin: "^((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(#)(?:(?:\\s)+)?pragma\\b",
      end: "(?<!\\\\)(?=\\n)",
      beginCaptures: {
        0: {
          name: "keyword.control.directive.pragma.cuda-cpp"
        },
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          name: "punctuation.definition.directive.cuda-cpp"
        }
      },
      endCaptures: {},
      name: "meta.preprocessor.pragma.cuda-cpp",
      patterns: [{
        include: "#comments"
      }, {
        include: "#string_context"
      }, {
        match: "[a-zA-Z_$][\\w\\-$]*",
        name: "entity.other.attribute-name.pragma.preprocessor.cuda-cpp"
      }, {
        include: "#preprocessor_number_literal"
      }, {
        include: "#line_continuation_character"
      }]
    },
    pragma_mark: {
      match: "(^((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(#)(?:(?:\\s)+)?pragma(?:\\s)+mark)(?:\\s)+(.*)",
      captures: {
        1: {
          name: "keyword.control.directive.pragma.pragma-mark.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        4: {
          name: "punctuation.definition.directive.cuda-cpp"
        },
        5: {
          name: "entity.name.tag.pragma-mark.cuda-cpp"
        }
      },
      name: "meta.preprocessor.pragma.cuda-cpp"
    },
    predefined_macros: {
      patterns: [{
        match: "\\b(__cplusplus|__DATE__|__FILE__|__LINE__|__STDC__|__STDC_HOSTED__|__STDC_NO_COMPLEX__|__STDC_VERSION__|__STDCPP_THREADS__|__TIME__|NDEBUG|__OBJC__|__ASSEMBLER__|__ATOM__|__AVX__|__AVX2__|_CHAR_UNSIGNED|__CLR_VER|_CONTROL_FLOW_GUARD|__COUNTER__|__cplusplus_cli|__cplusplus_winrt|_CPPRTTI|_CPPUNWIND|_DEBUG|_DLL|__FUNCDNAME__|__FUNCSIG__|__FUNCTION__|_INTEGRAL_MAX_BITS|__INTELLISENSE__|_ISO_VOLATILE|_KERNEL_MODE|_M_AMD64|_M_ARM|_M_ARM_ARMV7VE|_M_ARM_FP|_M_ARM64|_M_CEE|_M_CEE_PURE|_M_CEE_SAFE|_M_FP_EXCEPT|_M_FP_FAST|_M_FP_PRECISE|_M_FP_STRICT|_M_IX86|_M_IX86_FP|_M_X64|_MANAGED|_MSC_BUILD|_MSC_EXTENSIONS|_MSC_FULL_VER|_MSC_VER|_MSVC_LANG|__MSVC_RUNTIME_CHECKS|_MT|_NATIVE_WCHAR_T_DEFINED|_OPENMP|_PREFAST|__TIMESTAMP__|_VC_NO_DEFAULTLIB|_WCHAR_T_DEFINED|_WIN32|_WIN64|_WINRT_DLL|_ATL_VER|_MFC_VER|__GFORTRAN__|__GNUC__|__GNUC_MINOR__|__GNUC_PATCHLEVEL__|__GNUG__|__STRICT_ANSI__|__BASE_FILE__|__INCLUDE_LEVEL__|__ELF__|__VERSION__|__OPTIMIZE__|__OPTIMIZE_SIZE__|__NO_INLINE__|__GNUC_STDC_INLINE__|__CHAR_UNSIGNED__|__WCHAR_UNSIGNED__|__REGISTER_PREFIX__|__REGISTER_PREFIX__|__SIZE_TYPE__|__PTRDIFF_TYPE__|__WCHAR_TYPE__|__WINT_TYPE__|__INTMAX_TYPE__|__UINTMAX_TYPE__|__SIG_ATOMIC_TYPE__|__INT8_TYPE__|__INT16_TYPE__|__INT32_TYPE__|__INT64_TYPE__|__UINT8_TYPE__|__UINT16_TYPE__|__UINT32_TYPE__|__UINT64_TYPE__|__INT_LEAST8_TYPE__|__INT_LEAST16_TYPE__|__INT_LEAST32_TYPE__|__INT_LEAST64_TYPE__|__UINT_LEAST8_TYPE__|__UINT_LEAST16_TYPE__|__UINT_LEAST32_TYPE__|__UINT_LEAST64_TYPE__|__INT_FAST8_TYPE__|__INT_FAST16_TYPE__|__INT_FAST32_TYPE__|__INT_FAST64_TYPE__|__UINT_FAST8_TYPE__|__UINT_FAST16_TYPE__|__UINT_FAST32_TYPE__|__UINT_FAST64_TYPE__|__INTPTR_TYPE__|__UINTPTR_TYPE__|__CHAR_BIT__|__SCHAR_MAX__|__WCHAR_MAX__|__SHRT_MAX__|__INT_MAX__|__LONG_MAX__|__LONG_LONG_MAX__|__WINT_MAX__|__SIZE_MAX__|__PTRDIFF_MAX__|__INTMAX_MAX__|__UINTMAX_MAX__|__SIG_ATOMIC_MAX__|__INT8_MAX__|__INT16_MAX__|__INT32_MAX__|__INT64_MAX__|__UINT8_MAX__|__UINT16_MAX__|__UINT32_MAX__|__UINT64_MAX__|__INT_LEAST8_MAX__|__INT_LEAST16_MAX__|__INT_LEAST32_MAX__|__INT_LEAST64_MAX__|__UINT_LEAST8_MAX__|__UINT_LEAST16_MAX__|__UINT_LEAST32_MAX__|__UINT_LEAST64_MAX__|__INT_FAST8_MAX__|__INT_FAST16_MAX__|__INT_FAST32_MAX__|__INT_FAST64_MAX__|__UINT_FAST8_MAX__|__UINT_FAST16_MAX__|__UINT_FAST32_MAX__|__UINT_FAST64_MAX__|__INTPTR_MAX__|__UINTPTR_MAX__|__WCHAR_MIN__|__WINT_MIN__|__SIG_ATOMIC_MIN__|__SCHAR_WIDTH__|__SHRT_WIDTH__|__INT_WIDTH__|__LONG_WIDTH__|__LONG_LONG_WIDTH__|__PTRDIFF_WIDTH__|__SIG_ATOMIC_WIDTH__|__SIZE_WIDTH__|__WCHAR_WIDTH__|__WINT_WIDTH__|__INT_LEAST8_WIDTH__|__INT_LEAST16_WIDTH__|__INT_LEAST32_WIDTH__|__INT_LEAST64_WIDTH__|__INT_FAST8_WIDTH__|__INT_FAST16_WIDTH__|__INT_FAST32_WIDTH__|__INT_FAST64_WIDTH__|__INTPTR_WIDTH__|__INTMAX_WIDTH__|__SIZEOF_INT__|__SIZEOF_LONG__|__SIZEOF_LONG_LONG__|__SIZEOF_SHORT__|__SIZEOF_POINTER__|__SIZEOF_FLOAT__|__SIZEOF_DOUBLE__|__SIZEOF_LONG_DOUBLE__|__SIZEOF_SIZE_T__|__SIZEOF_WCHAR_T__|__SIZEOF_WINT_T__|__SIZEOF_PTRDIFF_T__|__BYTE_ORDER__|__ORDER_LITTLE_ENDIAN__|__ORDER_BIG_ENDIAN__|__ORDER_PDP_ENDIAN__|__FLOAT_WORD_ORDER__|__DEPRECATED|__EXCEPTIONS|__GXX_RTTI|__USING_SJLJ_EXCEPTIONS__|__GXX_EXPERIMENTAL_CXX0X__|__GXX_WEAK__|__NEXT_RUNTIME__|__LP64__|_LP64|__SSP__|__SSP_ALL__|__SSP_STRONG__|__SSP_EXPLICIT__|__SANITIZE_ADDRESS__|__SANITIZE_THREAD__|__GCC_HAVE_SYNC_COMPARE_AND_SWAP_1|__GCC_HAVE_SYNC_COMPARE_AND_SWAP_2|__GCC_HAVE_SYNC_COMPARE_AND_SWAP_4|__GCC_HAVE_SYNC_COMPARE_AND_SWAP_8|__GCC_HAVE_SYNC_COMPARE_AND_SWAP_16|__HAVE_SPECULATION_SAFE_VALUE|__GCC_HAVE_DWARF2_CFI_ASM|__FP_FAST_FMA|__FP_FAST_FMAF|__FP_FAST_FMAL|__FP_FAST_FMAF16|__FP_FAST_FMAF32|__FP_FAST_FMAF64|__FP_FAST_FMAF128|__FP_FAST_FMAF32X|__FP_FAST_FMAF64X|__FP_FAST_FMAF128X|__GCC_IEC_559|__GCC_IEC_559_COMPLEX|__NO_MATH_ERRNO__|__has_builtin|__has_feature|__has_extension|__has_cpp_attribute|__has_c_attribute|__has_attribute|__has_declspec_attribute|__is_identifier|__has_include|__has_include_next|__has_warning|__BASE_FILE__|__FILE_NAME__|__clang__|__clang_major__|__clang_minor__|__clang_patchlevel__|__clang_version__|__fp16|_Float16)\\b",
        captures: {
          1: {
            name: "entity.name.other.preprocessor.macro.predefined.$1.cuda-cpp"
          }
        }
      }, {
        match: "\\b__([A-Z_]+)__\\b",
        name: "entity.name.other.preprocessor.macro.predefined.probably.$1.cuda-cpp"
      }]
    },
    preprocessor_conditional_context: {
      patterns: [{
        include: "#preprocessor_conditional_defined"
      }, {
        include: "#comments"
      }, {
        include: "#language_constants"
      }, {
        include: "#string_context"
      }, {
        include: "#d9bc4796b0b_preprocessor_number_literal"
      }, {
        include: "#operators"
      }, {
        include: "#predefined_macros"
      }, {
        include: "#macro_name"
      }, {
        include: "#line_continuation_character"
      }]
    },
    preprocessor_conditional_defined: {
      begin: "((?<!\\w)defined(?!\\w))(\\()",
      end: "(?:\\)|(?<!\\\\)(?=\\n))",
      beginCaptures: {
        1: {
          name: "keyword.control.directive.conditional.defined.cuda-cpp"
        },
        2: {
          name: "punctuation.section.parens.control.defined.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.parens.control.defined.cuda-cpp"
        }
      },
      patterns: [{
        include: "#macro_name"
      }]
    },
    preprocessor_conditional_parentheses: {
      begin: "\\(",
      end: "\\)",
      beginCaptures: {
        0: {
          name: "punctuation.section.parens.begin.bracket.round.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.parens.end.bracket.round.cuda-cpp"
        }
      },
      name: "meta.parens.preprocessor.conditional.cuda-cpp"
    },
    preprocessor_conditional_range: {
      begin: "^((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(#)(?:(?:\\s)+)?((?:(?:ifndef|ifdef)|if))",
      end: "^(?!\\s*+#\\s*(?:else|endif))",
      beginCaptures: {
        0: {
          name: "keyword.control.directive.conditional.$6.cuda-cpp"
        },
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          name: "punctuation.definition.directive.cuda-cpp"
        },
        6: {}
      },
      endCaptures: {},
      patterns: [{
        begin: "\\G(?<=ifndef|ifdef|if)",
        end: "(?<!\\\\)(?=\\n)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.preprocessor.conditional.cuda-cpp",
        patterns: [{
          include: "#preprocessor_conditional_context"
        }]
      }, {
        include: "$self"
      }]
    },
    preprocessor_conditional_standalone: {
      match: "^((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(#)(?:(?:\\s)+)?((?<!\\w)(?:endif|else|elif)(?!\\w))",
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "punctuation.definition.directive.cuda-cpp"
        }
      },
      name: "keyword.control.directive.$4.cuda-cpp"
    },
    preprocessor_context: {
      patterns: [{
        include: "#pragma_mark"
      }, {
        include: "#pragma"
      }, {
        include: "#include"
      }, {
        include: "#line"
      }, {
        include: "#diagnostic"
      }, {
        include: "#undef"
      }, {
        include: "#preprocessor_conditional_range"
      }, {
        include: "#single_line_macro"
      }, {
        include: "#macro"
      }, {
        include: "#preprocessor_conditional_standalone"
      }, {
        include: "#macro_argument"
      }]
    },
    qualified_type: {
      match: `\\s*+((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:(?:unsigned)|(?:signed)|(?:short)|(?:long))|(?:(?:struct)|(?:class)|(?:union)|(?:enum)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<11>?)+>)(?:\\s)*+)?::)*+)?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?!(?:(?:transaction_safe_dynamic)|(?:__has_cpp_attribute)|(?:reinterpret_cast)|(?:transaction_safe)|(?:__forceinline__)|(?:atomic_noexcept)|(?:__has_include)|(?:atomic_cancel)|(?:atomic_commit)|(?:dynamic_cast)|(?:__constant__)|(?:__restrict__)|(?:__noinline__)|(?:thread_local)|(?:synchronized)|(?:static_cast)|(?:__managed__)|(?:const_cast)|(?:__shared__)|(?:__global__)|(?:__device__)|(?:co_return)|(?:constexpr)|(?:constexpr)|(?:constexpr)|(?:consteval)|(?:protected)|(?:threadIdx)|(?:namespace)|(?:co_return)|(?:noexcept)|(?:noexcept)|(?:continue)|(?:co_await)|(?:co_yield)|(?:volatile)|(?:register)|(?:restrict)|(?:explicit)|(?:__host__)|(?:override)|(?:volatile)|(?:noexcept)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:template)|(?:operator)|(?:decltype)|(?:typename)|(?:requires)|(?:co_await)|(?:co_yield)|(?:reflexpr)|(?:alignof)|(?:alignas)|(?:default)|(?:nullptr)|(?:mutable)|(?:virtual)|(?:mutable)|(?:private)|(?:include)|(?:warning)|(?:_Pragma)|(?:defined)|(?:gridDim)|(?:typedef)|(?:__asm__)|(?:concept)|(?:sizeof)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:typeid)|(?:switch)|(?:return)|(?:static)|(?:extern)|(?:inline)|(?:friend)|(?:public)|(?:ifndef)|(?:define)|(?:pragma)|(?:export)|(?:import)|(?:module)|(?:compl)|(?:bitor)|(?:throw)|(?:or_eq)|(?:while)|(?:catch)|(?:break)|(?:false)|(?:const)|(?:final)|(?:const)|(?:endif)|(?:ifdef)|(?:undef)|(?:error)|(?:using)|(?:audit)|(?:axiom)|(?:else)|(?:goto)|(?:case)|(?:NULL)|(?:true)|(?:elif)|(?:else)|(?:line)|(?:this)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:for)|(?:try)|(?:asm)|(?:or)|(?:do)|(?:if)|(?:if))\\b)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<11>?)+>)?(?![\\w<:.])`,
      captures: {
        0: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:(?:struct)|(?:class)|(?:union)|(?:enum))(?!\\w)",
            name: "storage.type.$0.cuda-cpp"
          }, {
            include: "#attributes_context"
          }, {
            include: "#storage_types"
          }, {
            include: "#number_literal"
          }, {
            include: "#string_context"
          }, {
            include: "#comma"
          }, {
            include: "#scope_resolution_inner_generated"
          }, {
            begin: "<",
            end: ">",
            beginCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
              }
            },
            name: "meta.template.call.cuda-cpp",
            patterns: [{
              include: "#template_call_context"
            }]
          }, {
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.type.cuda-cpp"
          }]
        },
        1: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        4: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        5: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        6: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.type.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.type.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        7: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        9: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        10: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      },
      name: "meta.qualified_type.cuda-cpp"
    },
    qualifiers_and_specifiers_post_parameters: {
      match: "((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?:((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?<!\\w)(?:(?:override)|(?:volatile)|(?:noexcept)|(?:final)|(?:const))(?!\\w))+(?=\\s*(?:(?:\\{|;)|[\\n\\r])))",
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "storage.modifier.specifier.functional.post-parameters.$3.cuda-cpp"
        },
        4: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        5: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      }
    },
    scope_resolution: {
      match: `(::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<3>?)+>)(?:\\s)*+)?::)*\\s*+`,
      captures: {
        0: {
          patterns: [{
            include: "#scope_resolution_inner_generated"
          }]
        },
        1: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#template_call_range"
          }]
        }
      }
    },
    scope_resolution_function_call: {
      match: `(::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<3>?)+>)(?:\\s)*+)?::)*\\s*+`,
      captures: {
        0: {
          patterns: [{
            include: "#scope_resolution_function_call_inner_generated"
          }]
        },
        1: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.function.call.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#template_call_range"
          }]
        }
      }
    },
    scope_resolution_function_call_inner_generated: {
      match: `((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?::)*\\s*+)((?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?(::)`,
      captures: {
        1: {
          patterns: [{
            include: "#scope_resolution_function_call_inner_generated"
          }]
        },
        2: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.function.call.cuda-cpp"
        },
        3: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        4: {},
        5: {
          name: "entity.name.scope-resolution.function.call.cuda-cpp"
        },
        6: {
          name: "meta.template.call.cuda-cpp",
          patterns: [{
            include: "#template_call_range"
          }]
        },
        7: {},
        8: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.function.call.cuda-cpp"
        }
      }
    },
    scope_resolution_function_definition: {
      match: `(::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<3>?)+>)(?:\\s)*+)?::)*\\s*+`,
      captures: {
        0: {
          patterns: [{
            include: "#scope_resolution_function_definition_inner_generated"
          }]
        },
        1: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.function.definition.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#template_call_range"
          }]
        }
      }
    },
    scope_resolution_function_definition_inner_generated: {
      match: `((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?::)*\\s*+)((?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?(::)`,
      captures: {
        1: {
          patterns: [{
            include: "#scope_resolution_function_definition_inner_generated"
          }]
        },
        2: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.function.definition.cuda-cpp"
        },
        3: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        4: {},
        5: {
          name: "entity.name.scope-resolution.function.definition.cuda-cpp"
        },
        6: {
          name: "meta.template.call.cuda-cpp",
          patterns: [{
            include: "#template_call_range"
          }]
        },
        7: {},
        8: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.function.definition.cuda-cpp"
        }
      }
    },
    scope_resolution_function_definition_operator_overload: {
      match: `(::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<3>?)+>)(?:\\s)*+)?::)*\\s*+`,
      captures: {
        0: {
          patterns: [{
            include: "#scope_resolution_function_definition_operator_overload_inner_generated"
          }]
        },
        1: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.function.definition.operator-overload.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#template_call_range"
          }]
        }
      }
    },
    scope_resolution_function_definition_operator_overload_inner_generated: {
      match: `((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?::)*\\s*+)((?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?(::)`,
      captures: {
        1: {
          patterns: [{
            include: "#scope_resolution_function_definition_operator_overload_inner_generated"
          }]
        },
        2: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.function.definition.operator-overload.cuda-cpp"
        },
        3: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        4: {},
        5: {
          name: "entity.name.scope-resolution.function.definition.operator-overload.cuda-cpp"
        },
        6: {
          name: "meta.template.call.cuda-cpp",
          patterns: [{
            include: "#template_call_range"
          }]
        },
        7: {},
        8: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.function.definition.operator-overload.cuda-cpp"
        }
      }
    },
    scope_resolution_inner_generated: {
      match: `((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?::)*\\s*+)((?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?(::)`,
      captures: {
        1: {
          patterns: [{
            include: "#scope_resolution_inner_generated"
          }]
        },
        2: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
        },
        3: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        4: {},
        5: {
          name: "entity.name.scope-resolution.cuda-cpp"
        },
        6: {
          name: "meta.template.call.cuda-cpp",
          patterns: [{
            include: "#template_call_range"
          }]
        },
        7: {},
        8: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
        }
      }
    },
    scope_resolution_namespace_alias: {
      match: `(::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<3>?)+>)(?:\\s)*+)?::)*\\s*+`,
      captures: {
        0: {
          patterns: [{
            include: "#scope_resolution_namespace_alias_inner_generated"
          }]
        },
        1: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.namespace.alias.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#template_call_range"
          }]
        }
      }
    },
    scope_resolution_namespace_alias_inner_generated: {
      match: `((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?::)*\\s*+)((?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?(::)`,
      captures: {
        1: {
          patterns: [{
            include: "#scope_resolution_namespace_alias_inner_generated"
          }]
        },
        2: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.namespace.alias.cuda-cpp"
        },
        3: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        4: {},
        5: {
          name: "entity.name.scope-resolution.namespace.alias.cuda-cpp"
        },
        6: {
          name: "meta.template.call.cuda-cpp",
          patterns: [{
            include: "#template_call_range"
          }]
        },
        7: {},
        8: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.namespace.alias.cuda-cpp"
        }
      }
    },
    scope_resolution_namespace_block: {
      match: `(::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<3>?)+>)(?:\\s)*+)?::)*\\s*+`,
      captures: {
        0: {
          patterns: [{
            include: "#scope_resolution_namespace_block_inner_generated"
          }]
        },
        1: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.namespace.block.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#template_call_range"
          }]
        }
      }
    },
    scope_resolution_namespace_block_inner_generated: {
      match: `((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?::)*\\s*+)((?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?(::)`,
      captures: {
        1: {
          patterns: [{
            include: "#scope_resolution_namespace_block_inner_generated"
          }]
        },
        2: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.namespace.block.cuda-cpp"
        },
        3: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        4: {},
        5: {
          name: "entity.name.scope-resolution.namespace.block.cuda-cpp"
        },
        6: {
          name: "meta.template.call.cuda-cpp",
          patterns: [{
            include: "#template_call_range"
          }]
        },
        7: {},
        8: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.namespace.block.cuda-cpp"
        }
      }
    },
    scope_resolution_namespace_using: {
      match: `(::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<3>?)+>)(?:\\s)*+)?::)*\\s*+`,
      captures: {
        0: {
          patterns: [{
            include: "#scope_resolution_namespace_using_inner_generated"
          }]
        },
        1: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.namespace.using.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#template_call_range"
          }]
        }
      }
    },
    scope_resolution_namespace_using_inner_generated: {
      match: `((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?::)*\\s*+)((?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?(::)`,
      captures: {
        1: {
          patterns: [{
            include: "#scope_resolution_namespace_using_inner_generated"
          }]
        },
        2: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.namespace.using.cuda-cpp"
        },
        3: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        4: {},
        5: {
          name: "entity.name.scope-resolution.namespace.using.cuda-cpp"
        },
        6: {
          name: "meta.template.call.cuda-cpp",
          patterns: [{
            include: "#template_call_range"
          }]
        },
        7: {},
        8: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.namespace.using.cuda-cpp"
        }
      }
    },
    scope_resolution_parameter: {
      match: `(::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<3>?)+>)(?:\\s)*+)?::)*\\s*+`,
      captures: {
        0: {
          patterns: [{
            include: "#scope_resolution_parameter_inner_generated"
          }]
        },
        1: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.parameter.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#template_call_range"
          }]
        }
      }
    },
    scope_resolution_parameter_inner_generated: {
      match: `((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?::)*\\s*+)((?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?(::)`,
      captures: {
        1: {
          patterns: [{
            include: "#scope_resolution_parameter_inner_generated"
          }]
        },
        2: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.parameter.cuda-cpp"
        },
        3: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        4: {},
        5: {
          name: "entity.name.scope-resolution.parameter.cuda-cpp"
        },
        6: {
          name: "meta.template.call.cuda-cpp",
          patterns: [{
            include: "#template_call_range"
          }]
        },
        7: {},
        8: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.parameter.cuda-cpp"
        }
      }
    },
    scope_resolution_template_call: {
      match: `(::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<3>?)+>)(?:\\s)*+)?::)*\\s*+`,
      captures: {
        0: {
          patterns: [{
            include: "#scope_resolution_template_call_inner_generated"
          }]
        },
        1: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.template.call.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#template_call_range"
          }]
        }
      }
    },
    scope_resolution_template_call_inner_generated: {
      match: `((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?::)*\\s*+)((?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?(::)`,
      captures: {
        1: {
          patterns: [{
            include: "#scope_resolution_template_call_inner_generated"
          }]
        },
        2: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.template.call.cuda-cpp"
        },
        3: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        4: {},
        5: {
          name: "entity.name.scope-resolution.template.call.cuda-cpp"
        },
        6: {
          name: "meta.template.call.cuda-cpp",
          patterns: [{
            include: "#template_call_range"
          }]
        },
        7: {},
        8: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.template.call.cuda-cpp"
        }
      }
    },
    scope_resolution_template_definition: {
      match: `(::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<3>?)+>)(?:\\s)*+)?::)*\\s*+`,
      captures: {
        0: {
          patterns: [{
            include: "#scope_resolution_template_definition_inner_generated"
          }]
        },
        1: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.template.definition.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#template_call_range"
          }]
        }
      }
    },
    scope_resolution_template_definition_inner_generated: {
      match: `((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?::)*\\s*+)((?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<7>?)+>)(?:\\s)*+)?(::)`,
      captures: {
        1: {
          patterns: [{
            include: "#scope_resolution_template_definition_inner_generated"
          }]
        },
        2: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.template.definition.cuda-cpp"
        },
        3: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        4: {},
        5: {
          name: "entity.name.scope-resolution.template.definition.cuda-cpp"
        },
        6: {
          name: "meta.template.call.cuda-cpp",
          patterns: [{
            include: "#template_call_range"
          }]
        },
        7: {},
        8: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.template.definition.cuda-cpp"
        }
      }
    },
    semicolon: {
      match: ";",
      name: "punctuation.terminator.statement.cuda-cpp"
    },
    simple_type: {
      match: `(\\s*+((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:(?:unsigned)|(?:signed)|(?:short)|(?:long))|(?:(?:struct)|(?:class)|(?:union)|(?:enum)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<12>?)+>)(?:\\s)*+)?::)*+)?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?!(?:(?:transaction_safe_dynamic)|(?:__has_cpp_attribute)|(?:reinterpret_cast)|(?:transaction_safe)|(?:__forceinline__)|(?:atomic_noexcept)|(?:__has_include)|(?:atomic_cancel)|(?:atomic_commit)|(?:dynamic_cast)|(?:__constant__)|(?:__restrict__)|(?:__noinline__)|(?:thread_local)|(?:synchronized)|(?:static_cast)|(?:__managed__)|(?:const_cast)|(?:__shared__)|(?:__global__)|(?:__device__)|(?:co_return)|(?:constexpr)|(?:constexpr)|(?:constexpr)|(?:consteval)|(?:protected)|(?:threadIdx)|(?:namespace)|(?:co_return)|(?:noexcept)|(?:noexcept)|(?:continue)|(?:co_await)|(?:co_yield)|(?:volatile)|(?:register)|(?:restrict)|(?:explicit)|(?:__host__)|(?:override)|(?:volatile)|(?:noexcept)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:template)|(?:operator)|(?:decltype)|(?:typename)|(?:requires)|(?:co_await)|(?:co_yield)|(?:reflexpr)|(?:alignof)|(?:alignas)|(?:default)|(?:nullptr)|(?:mutable)|(?:virtual)|(?:mutable)|(?:private)|(?:include)|(?:warning)|(?:_Pragma)|(?:defined)|(?:gridDim)|(?:typedef)|(?:__asm__)|(?:concept)|(?:sizeof)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:typeid)|(?:switch)|(?:return)|(?:static)|(?:extern)|(?:inline)|(?:friend)|(?:public)|(?:ifndef)|(?:define)|(?:pragma)|(?:export)|(?:import)|(?:module)|(?:compl)|(?:bitor)|(?:throw)|(?:or_eq)|(?:while)|(?:catch)|(?:break)|(?:false)|(?:const)|(?:final)|(?:const)|(?:endif)|(?:ifdef)|(?:undef)|(?:error)|(?:using)|(?:audit)|(?:axiom)|(?:else)|(?:goto)|(?:case)|(?:NULL)|(?:true)|(?:elif)|(?:else)|(?:line)|(?:this)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:for)|(?:try)|(?:asm)|(?:or)|(?:do)|(?:if)|(?:if))\\b)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<12>?)+>)?(?![\\w<:.]))(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?`,
      captures: {
        1: {
          name: "meta.qualified_type.cuda-cpp",
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:(?:struct)|(?:class)|(?:union)|(?:enum))(?!\\w)",
            name: "storage.type.$0.cuda-cpp"
          }, {
            include: "#attributes_context"
          }, {
            include: "#storage_types"
          }, {
            include: "#number_literal"
          }, {
            include: "#string_context"
          }, {
            include: "#comma"
          }, {
            include: "#scope_resolution_inner_generated"
          }, {
            begin: "<",
            end: ">",
            beginCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
              }
            },
            name: "meta.template.call.cuda-cpp",
            patterns: [{
              include: "#template_call_context"
            }]
          }, {
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.type.cuda-cpp"
          }]
        },
        2: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        3: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        4: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        5: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        6: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        7: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.type.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.type.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        8: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        9: {},
        10: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        11: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        12: {},
        13: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        14: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        15: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        16: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        17: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      }
    },
    single_line_macro: {
      match: "^((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))#define.*(?<![\\\\])(?:(?:\\n)|$)",
      captures: {
        0: {
          patterns: [{
            include: "#macro"
          }, {
            include: "#comments"
          }]
        },
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      }
    },
    sizeof_operator: {
      begin: "((?<!\\w)sizeof(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
      end: "\\)",
      beginCaptures: {
        1: {
          name: "keyword.operator.functionlike.cuda-cpp keyword.operator.sizeof.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        6: {
          name: "punctuation.section.arguments.begin.bracket.round.operator.sizeof.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.arguments.end.bracket.round.operator.sizeof.cuda-cpp"
        }
      },
      contentName: "meta.arguments.operator.sizeof",
      patterns: [{
        include: "#evaluation_context"
      }]
    },
    sizeof_variadic_operator: {
      begin: "(\\bsizeof\\.\\.\\.)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
      end: "\\)",
      beginCaptures: {
        1: {
          name: "keyword.operator.functionlike.cuda-cpp keyword.operator.sizeof.variadic.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        6: {
          name: "punctuation.section.arguments.begin.bracket.round.operator.sizeof.variadic.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.arguments.end.bracket.round.operator.sizeof.variadic.cuda-cpp"
        }
      },
      contentName: "meta.arguments.operator.sizeof.variadic",
      patterns: [{
        include: "#evaluation_context"
      }]
    },
    square_brackets: {
      name: "meta.bracket.square.access",
      begin: "([a-zA-Z_][a-zA-Z_0-9]*|(?<=[\\]\\)]))?(\\[)(?!\\])",
      beginCaptures: {
        1: {
          name: "variable.other.object"
        },
        2: {
          name: "punctuation.definition.begin.bracket.square"
        }
      },
      end: "\\]",
      endCaptures: {
        0: {
          name: "punctuation.definition.end.bracket.square"
        }
      },
      patterns: [{
        include: "#evaluation_context"
      }]
    },
    standard_declares: {
      patterns: [{
        match: "((?<!\\w)struct(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\b(?!override\\W|override\\$|final\\W|final\\$)((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\S)(?![:{a-zA-Z])",
        captures: {
          1: {
            name: "storage.type.struct.declare.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          4: {
            name: "entity.name.type.struct.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*",
              name: "storage.modifier.pointer.cuda-cpp"
            }, {
              match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
              captures: {
                1: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                2: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                3: {
                  name: "comment.block.cuda-cpp"
                },
                4: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              },
              name: "invalid.illegal.reference-type.cuda-cpp"
            }, {
              match: "\\&",
              name: "storage.modifier.reference.cuda-cpp"
            }]
          },
          6: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          7: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          8: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          9: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          10: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          11: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          12: {
            name: "variable.other.object.declare.cuda-cpp"
          },
          13: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          14: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          }
        }
      }, {
        match: "((?<!\\w)union(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\b(?!override\\W|override\\$|final\\W|final\\$)((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\S)(?![:{a-zA-Z])",
        captures: {
          1: {
            name: "storage.type.union.declare.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          4: {
            name: "entity.name.type.union.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*",
              name: "storage.modifier.pointer.cuda-cpp"
            }, {
              match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
              captures: {
                1: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                2: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                3: {
                  name: "comment.block.cuda-cpp"
                },
                4: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              },
              name: "invalid.illegal.reference-type.cuda-cpp"
            }, {
              match: "\\&",
              name: "storage.modifier.reference.cuda-cpp"
            }]
          },
          6: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          7: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          8: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          9: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          10: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          11: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          12: {
            name: "variable.other.object.declare.cuda-cpp"
          },
          13: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          14: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          }
        }
      }, {
        match: "((?<!\\w)enum(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\b(?!override\\W|override\\$|final\\W|final\\$)((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\S)(?![:{a-zA-Z])",
        captures: {
          1: {
            name: "storage.type.enum.declare.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          4: {
            name: "entity.name.type.enum.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*",
              name: "storage.modifier.pointer.cuda-cpp"
            }, {
              match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
              captures: {
                1: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                2: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                3: {
                  name: "comment.block.cuda-cpp"
                },
                4: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              },
              name: "invalid.illegal.reference-type.cuda-cpp"
            }, {
              match: "\\&",
              name: "storage.modifier.reference.cuda-cpp"
            }]
          },
          6: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          7: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          8: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          9: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          10: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          11: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          12: {
            name: "variable.other.object.declare.cuda-cpp"
          },
          13: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          14: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          }
        }
      }, {
        match: "((?<!\\w)class(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\b(?!override\\W|override\\$|final\\W|final\\$)((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\S)(?![:{a-zA-Z])",
        captures: {
          1: {
            name: "storage.type.class.declare.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          4: {
            name: "entity.name.type.class.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*",
              name: "storage.modifier.pointer.cuda-cpp"
            }, {
              match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
              captures: {
                1: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                2: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                3: {
                  name: "comment.block.cuda-cpp"
                },
                4: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              },
              name: "invalid.illegal.reference-type.cuda-cpp"
            }, {
              match: "\\&",
              name: "storage.modifier.reference.cuda-cpp"
            }]
          },
          6: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          7: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          8: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          9: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          10: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          11: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          },
          12: {
            name: "variable.other.object.declare.cuda-cpp"
          },
          13: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          14: {
            patterns: [{
              match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
              captures: {
                1: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                2: {
                  name: "comment.block.cuda-cpp"
                },
                3: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }]
          }
        }
      }]
    },
    static_assert: {
      begin: "((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)static_assert|_Static_assert(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
      end: "\\)",
      beginCaptures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          name: "keyword.other.static_assert.cuda-cpp"
        },
        6: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        7: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        8: {
          name: "comment.block.cuda-cpp"
        },
        9: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        10: {
          name: "punctuation.section.arguments.begin.bracket.round.static_assert.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.arguments.end.bracket.round.static_assert.cuda-cpp"
        }
      },
      patterns: [{
        begin: '(,)(?:(?:\\s)+)?(?=(?:L|u8|u|U(?:(?:\\s)+)?\\")?)',
        end: "(?=\\))",
        beginCaptures: {
          1: {
            name: "punctuation.separator.delimiter.comma.cuda-cpp"
          }
        },
        endCaptures: {},
        name: "meta.static_assert.message.cuda-cpp",
        patterns: [{
          include: "#string_context"
        }]
      }, {
        include: "#evaluation_context"
      }]
    },
    std_space: {
      match: "(?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))",
      captures: {
        0: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        1: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      }
    },
    storage_specifiers: {
      match: "((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:(?:__constant__)|(?:__restrict__)|(?:__managed__)|(?:__shared__)|(?:volatile)|(?:register)|(?:restrict)|(?:static)|(?:extern)|(?:const))(?!\\w))",
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "storage.modifier.specifier.$3.cuda-cpp"
        }
      }
    },
    storage_types: {
      patterns: [{
        include: "#storage_specifiers"
      }, {
        include: "#inline_builtin_storage_type"
      }, {
        include: "#decltype"
      }, {
        include: "#typename"
      }]
    },
    string_context: {
      patterns: [{
        begin: '((?:u|u8|U|L)?)"',
        end: '"',
        beginCaptures: {
          0: {
            name: "punctuation.definition.string.begin.cuda-cpp"
          },
          1: {
            name: "meta.encoding.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.definition.string.end.cuda-cpp"
          }
        },
        name: "string.quoted.double.cuda-cpp",
        patterns: [{
          match: "(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8})",
          name: "constant.character.escape.cuda-cpp"
        }, {
          match: `\\\\['"?\\\\abfnrtv]`,
          name: "constant.character.escape.cuda-cpp"
        }, {
          match: "\\\\[0-7]{1,3}",
          name: "constant.character.escape.cuda-cpp"
        }, {
          match: "(?:(\\\\x0*[0-9a-fA-F]{2}(?![0-9a-fA-F]))|((?:\\\\x[0-9a-fA-F]*|\\\\x)))",
          captures: {
            1: {
              name: "constant.character.escape.cuda-cpp"
            },
            2: {
              name: "invalid.illegal.unknown-escape.cuda-cpp"
            }
          }
        }, {
          include: "#string_escapes_context_c"
        }]
      }, {
        begin: "(?<![0-9A-Fa-f])((?:u|u8|U|L)?)'",
        end: "'",
        beginCaptures: {
          0: {
            name: "punctuation.definition.string.begin.cuda-cpp"
          },
          1: {
            name: "meta.encoding.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.definition.string.end.cuda-cpp"
          }
        },
        name: "string.quoted.single.cuda-cpp",
        patterns: [{
          match: "(?:(\\\\x0*[0-9a-fA-F]{2}(?![0-9a-fA-F]))|((?:\\\\x[0-9a-fA-F]*|\\\\x)))",
          captures: {
            1: {
              name: "constant.character.escape.cuda-cpp"
            },
            2: {
              name: "invalid.illegal.unknown-escape.cuda-cpp"
            }
          }
        }, {
          include: "#string_escapes_context_c"
        }, {
          include: "#line_continuation_character"
        }]
      }, {
        begin: '((?:[uUL]8?)?R)\\"(?:(?:_r|re)|regex)\\(',
        end: '\\)(?:(?:_r|re)|regex)\\"',
        beginCaptures: {
          0: {
            name: "punctuation.definition.string.begin.cuda-cpp"
          },
          1: {
            name: "meta.encoding.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.definition.string.end.cuda-cpp"
          }
        },
        name: "string.quoted.double.raw.regex.cuda-cpp",
        patterns: [{
          include: "source.regexp.python"
        }]
      }, {
        begin: '((?:[uUL]8?)?R)\\"(?:glsl|GLSL)\\(',
        end: '\\)(?:glsl|GLSL)\\"',
        beginCaptures: {
          0: {
            name: "punctuation.definition.string.begin.cuda-cpp"
          },
          1: {
            name: "meta.encoding.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.definition.string.end.cuda-cpp"
          }
        },
        name: "meta.string.quoted.double.raw.glsl.cuda-cpp",
        patterns: [{
          include: "source.glsl"
        }]
      }, {
        begin: '((?:[uUL]8?)?R)\\"(?:[pP]?(?:sql|SQL)|d[dm]l)\\(',
        end: '\\)(?:[pP]?(?:sql|SQL)|d[dm]l)\\"',
        beginCaptures: {
          0: {
            name: "punctuation.definition.string.begin.cuda-cpp"
          },
          1: {
            name: "meta.encoding.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.definition.string.end.cuda-cpp"
          }
        },
        name: "meta.string.quoted.double.raw.sql.cuda-cpp",
        patterns: [{
          include: "source.sql"
        }]
      }, {
        begin: '((?:u|u8|U|L)?R)"(?:([^ ()\\\\\\t]{0,16})|([^ ()\\\\\\t]*))\\(',
        beginCaptures: {
          0: {
            name: "punctuation.definition.string.begin"
          },
          1: {
            name: "meta.encoding"
          },
          3: {
            name: "invalid.illegal.delimiter-too-long"
          }
        },
        end: '\\)\\2(\\3)"',
        endCaptures: {
          0: {
            name: "punctuation.definition.string.end"
          },
          1: {
            name: "invalid.illegal.delimiter-too-long"
          }
        },
        name: "string.quoted.double.raw"
      }]
    },
    string_escapes_context_c: {
      patterns: [{
        match: `(?x)\\\\ (
\\\\			 |
[abefnprtv'"?]   |
[0-3][0-7]{,2}	 |
[4-7]\\d?		|
x[a-fA-F0-9]{,2} |
u[a-fA-F0-9]{,4} |
U[a-fA-F0-9]{,8} )`,
        name: "constant.character.escape"
      }, {
        match: "\\\\.",
        name: "invalid.illegal.unknown-escape"
      }, {
        match: `(?x) (?!%')(?!%")%
(\\d+\\$)?						   # field (argument #)
[#0\\- +']*						  # flags
[,;:_]?							  # separator character (AltiVec)
((-?\\d+)|\\*(-?\\d+\\$)?)?		  # minimum field width
(\\.((-?\\d+)|\\*(-?\\d+\\$)?)?)?	# precision
(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)? # length modifier
[diouxXDOUeEfFgGaACcSspn%]		   # conversion type`,
        name: "constant.other.placeholder"
      }]
    },
    struct_block: {
      begin: "((?<!\\w)struct(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?={)|(?:((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*+)?(?:((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(:(?!:)))?)",
      end: "(?:(?:(?<=\\}|%>|\\?\\?>)(?:(?:\\s)+)?(;)|(;))|(?=[;>\\[\\]=]))",
      beginCaptures: {
        0: {
          name: "meta.head.struct.cuda-cpp"
        },
        1: {
          name: "storage.type.$1.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        6: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        7: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        8: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        9: {
          name: "comment.block.cuda-cpp"
        },
        10: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        11: {
          patterns: [{
            match: "((?<!\\w)final(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))",
            captures: {
              1: {
                name: "storage.type.modifier.final.cuda-cpp"
              },
              2: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              3: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              4: {
                name: "comment.block.cuda-cpp"
              },
              5: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }, {
            match: "((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:((?<!\\w)final(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=:|{|$)",
            captures: {
              1: {
                name: "entity.name.type.struct.cuda-cpp"
              },
              2: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              3: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              4: {
                name: "comment.block.cuda-cpp"
              },
              5: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              6: {
                name: "storage.type.modifier.final.cuda-cpp"
              },
              7: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              8: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              9: {
                name: "comment.block.cuda-cpp"
              },
              10: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }, {
            match: "DLLEXPORT",
            name: "entity.name.other.preprocessor.macro.predefined.DLLEXPORT.cuda-cpp"
          }, {
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.other.preprocessor.macro.predefined.probably.$0.cuda-cpp"
          }]
        },
        12: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        13: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        14: {
          name: "comment.block.cuda-cpp"
        },
        15: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        16: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        17: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        18: {
          name: "comment.block.cuda-cpp"
        },
        19: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        20: {
          name: "punctuation.separator.colon.inheritance.cuda-cpp"
        }
      },
      endCaptures: {
        1: {
          name: "punctuation.terminator.statement.cuda-cpp"
        },
        2: {
          name: "punctuation.terminator.statement.cuda-cpp"
        }
      },
      name: "meta.block.struct.cuda-cpp",
      patterns: [{
        begin: "\\G ?",
        end: "(?:\\{|<%|\\?\\?<|(?=;))",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.struct.cuda-cpp"
          }
        },
        name: "meta.head.struct.cuda-cpp",
        patterns: [{
          include: "#ever_present_context"
        }, {
          include: "#inheritance_context"
        }, {
          include: "#template_call_range"
        }]
      }, {
        begin: "(?<=\\{|<%|\\?\\?<)",
        end: "\\}|%>|\\?\\?>",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.struct.cuda-cpp"
          }
        },
        name: "meta.body.struct.cuda-cpp",
        patterns: [{
          include: "#function_pointer"
        }, {
          include: "#static_assert"
        }, {
          include: "#constructor_inline"
        }, {
          include: "#destructor_inline"
        }, {
          include: "$self"
        }]
      }, {
        begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
        end: "[\\s]*(?=;)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.tail.struct.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }]
    },
    struct_declare: {
      match: "((?<!\\w)struct(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\b(?!override\\W|override\\$|final\\W|final\\$)((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\S)(?![:{a-zA-Z])",
      captures: {
        1: {
          name: "storage.type.struct.declare.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        4: {
          name: "entity.name.type.struct.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        6: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        7: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        8: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        9: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        10: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        11: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        12: {
          name: "variable.other.object.declare.cuda-cpp"
        },
        13: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        14: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      }
    },
    switch_conditional_parentheses: {
      begin: "((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
      end: "\\)",
      beginCaptures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          name: "punctuation.section.parens.begin.bracket.round.conditional.switch.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.parens.end.bracket.round.conditional.switch.cuda-cpp"
        }
      },
      name: "meta.conditional.switch.cuda-cpp",
      patterns: [{
        include: "#evaluation_context"
      }, {
        include: "#c_conditional_context"
      }]
    },
    switch_statement: {
      begin: "((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)switch(?!\\w))",
      end: "(?:(?<=\\}|%>|\\?\\?>)|(?=[;>\\[\\]=]))",
      beginCaptures: {
        0: {
          name: "meta.head.switch.cuda-cpp"
        },
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        3: {
          name: "comment.block.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        5: {
          name: "keyword.control.switch.cuda-cpp"
        }
      },
      endCaptures: {},
      name: "meta.block.switch.cuda-cpp",
      patterns: [{
        begin: "\\G ?",
        end: "(?:\\{|<%|\\?\\?<|(?=;))",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.switch.cuda-cpp"
          }
        },
        name: "meta.head.switch.cuda-cpp",
        patterns: [{
          include: "#switch_conditional_parentheses"
        }, {
          include: "$self"
        }]
      }, {
        begin: "(?<=\\{|<%|\\?\\?<)",
        end: "\\}|%>|\\?\\?>",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.switch.cuda-cpp"
          }
        },
        name: "meta.body.switch.cuda-cpp",
        patterns: [{
          include: "#default_statement"
        }, {
          include: "#case_statement"
        }, {
          include: "$self"
        }, {
          include: "#block_innards"
        }]
      }, {
        begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
        end: "[\\s]*(?=;)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.tail.switch.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }]
    },
    template_argument_defaulted: {
      match: "(?<=<|,)(?:(?:\\s)+)?((?:(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?:\\s)+)*)((?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)(?:(?:\\s)+)?([=])",
      captures: {
        1: {
          name: "storage.type.template.cuda-cpp"
        },
        2: {
          name: "entity.name.type.template.cuda-cpp"
        },
        3: {
          name: "keyword.operator.assignment.cuda-cpp"
        }
      }
    },
    template_call_context: {
      patterns: [{
        include: "#ever_present_context"
      }, {
        include: "#template_call_range"
      }, {
        include: "#storage_types"
      }, {
        include: "#language_constants"
      }, {
        include: "#scope_resolution_template_call_inner_generated"
      }, {
        include: "#operators"
      }, {
        include: "#number_literal"
      }, {
        include: "#string_context"
      }, {
        include: "#comma_in_template_argument"
      }, {
        include: "#qualified_type"
      }]
    },
    template_call_innards: {
      match: `((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<1>?)+>)(?:\\s)*+`,
      captures: {
        0: {
          patterns: [{
            include: "#template_call_range"
          }]
        }
      },
      name: "meta.template.call.cuda-cpp"
    },
    template_call_range: {
      begin: "<",
      end: ">",
      beginCaptures: {
        0: {
          name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
        }
      },
      name: "meta.template.call.cuda-cpp",
      patterns: [{
        include: "#template_call_context"
      }]
    },
    template_definition: {
      begin: "(?<!\\w)(template)(?:(?:\\s)+)?(<)",
      end: ">",
      beginCaptures: {
        1: {
          name: "storage.type.template.cuda-cpp"
        },
        2: {
          name: "punctuation.section.angle-brackets.start.template.definition.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.angle-brackets.end.template.definition.cuda-cpp"
        }
      },
      name: "meta.template.definition.cuda-cpp",
      patterns: [{
        begin: "(?<=\\w)(?:(?:\\s)+)?<",
        end: ">",
        beginCaptures: {
          0: {
            name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
          }
        },
        endCaptures: {
          0: {
            name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
          }
        },
        patterns: [{
          include: "#template_call_context"
        }]
      }, {
        include: "#template_definition_context"
      }]
    },
    template_definition_argument: {
      match: "((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:((?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)|((?:(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?:\\s)+)+)((?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*))|((?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)(?:(?:\\s)+)?(\\.\\.\\.)(?:(?:\\s)+)?((?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*))(?:(?:\\s)+)?(?:(,)|(?=>|$))",
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "storage.type.template.argument.$3.cuda-cpp"
        },
        4: {
          patterns: [{
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "storage.type.template.argument.$0.cuda-cpp"
          }]
        },
        5: {
          name: "entity.name.type.template.cuda-cpp"
        },
        6: {
          name: "storage.type.template.cuda-cpp"
        },
        7: {
          name: "punctuation.vararg-ellipses.template.definition.cuda-cpp"
        },
        8: {
          name: "entity.name.type.template.cuda-cpp"
        },
        9: {
          name: "punctuation.separator.delimiter.comma.template.argument.cuda-cpp"
        }
      }
    },
    template_definition_context: {
      patterns: [{
        include: "#scope_resolution_template_definition_inner_generated"
      }, {
        include: "#template_definition_argument"
      }, {
        include: "#template_argument_defaulted"
      }, {
        include: "#template_call_innards"
      }, {
        include: "#evaluation_context"
      }]
    },
    template_isolated_definition: {
      match: "(?<!\\w)(template)(?:(?:\\s)+)?(<)(.*)(>(?:(?:\\s)+)?$)",
      captures: {
        1: {
          name: "storage.type.template.cuda-cpp"
        },
        2: {
          name: "punctuation.section.angle-brackets.start.template.definition.cuda-cpp"
        },
        3: {
          name: "meta.template.definition.cuda-cpp",
          patterns: [{
            include: "#template_definition_context"
          }]
        },
        4: {
          name: "punctuation.section.angle-brackets.end.template.definition.cuda-cpp"
        }
      }
    },
    ternary_operator: {
      begin: "\\?",
      end: ":",
      beginCaptures: {
        0: {
          name: "keyword.operator.ternary.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "keyword.operator.ternary.cuda-cpp"
        }
      },
      patterns: [{
        include: "#ever_present_context"
      }, {
        include: "#string_context"
      }, {
        include: "#number_literal"
      }, {
        include: "#method_access"
      }, {
        include: "#member_access"
      }, {
        include: "#predefined_macros"
      }, {
        include: "#operators"
      }, {
        include: "#memory_operators"
      }, {
        include: "#wordlike_operators"
      }, {
        include: "#type_casting_operators"
      }, {
        include: "#control_flow_keywords"
      }, {
        include: "#exception_keywords"
      }, {
        include: "#the_this_keyword"
      }, {
        include: "#language_constants"
      }, {
        include: "#builtin_storage_type_initilizer"
      }, {
        include: "#qualifiers_and_specifiers_post_parameters"
      }, {
        include: "#functional_specifiers_pre_parameters"
      }, {
        include: "#storage_types"
      }, {
        include: "#lambdas"
      }, {
        include: "#attributes_context"
      }, {
        include: "#parentheses"
      }, {
        include: "#function_call"
      }, {
        include: "#scope_resolution_inner_generated"
      }, {
        include: "#square_brackets"
      }, {
        include: "#semicolon"
      }, {
        include: "#comma"
      }],
      applyEndPatternLast: 1
    },
    the_this_keyword: {
      match: "((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)this(?!\\w))",
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "variable.language.this.cuda-cpp"
        }
      }
    },
    type_alias: {
      match: `(using)(?:(?:\\s)+)?(?!namespace)(\\s*+((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:(?:unsigned)|(?:signed)|(?:short)|(?:long))|(?:(?:struct)|(?:class)|(?:union)|(?:enum)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<29>?)+>)(?:\\s)*+)?::)*+)?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?!(?:(?:transaction_safe_dynamic)|(?:__has_cpp_attribute)|(?:reinterpret_cast)|(?:transaction_safe)|(?:__forceinline__)|(?:atomic_noexcept)|(?:__has_include)|(?:atomic_cancel)|(?:atomic_commit)|(?:dynamic_cast)|(?:__constant__)|(?:__restrict__)|(?:__noinline__)|(?:thread_local)|(?:synchronized)|(?:static_cast)|(?:__managed__)|(?:const_cast)|(?:__shared__)|(?:__global__)|(?:__device__)|(?:co_return)|(?:constexpr)|(?:constexpr)|(?:constexpr)|(?:consteval)|(?:protected)|(?:threadIdx)|(?:namespace)|(?:co_return)|(?:noexcept)|(?:noexcept)|(?:continue)|(?:co_await)|(?:co_yield)|(?:volatile)|(?:register)|(?:restrict)|(?:explicit)|(?:__host__)|(?:override)|(?:volatile)|(?:noexcept)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:template)|(?:operator)|(?:decltype)|(?:typename)|(?:requires)|(?:co_await)|(?:co_yield)|(?:reflexpr)|(?:alignof)|(?:alignas)|(?:default)|(?:nullptr)|(?:mutable)|(?:virtual)|(?:mutable)|(?:private)|(?:include)|(?:warning)|(?:_Pragma)|(?:defined)|(?:gridDim)|(?:typedef)|(?:__asm__)|(?:concept)|(?:sizeof)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:typeid)|(?:switch)|(?:return)|(?:static)|(?:extern)|(?:inline)|(?:friend)|(?:public)|(?:ifndef)|(?:define)|(?:pragma)|(?:export)|(?:import)|(?:module)|(?:compl)|(?:bitor)|(?:throw)|(?:or_eq)|(?:while)|(?:catch)|(?:break)|(?:false)|(?:const)|(?:final)|(?:const)|(?:endif)|(?:ifdef)|(?:undef)|(?:error)|(?:using)|(?:audit)|(?:axiom)|(?:else)|(?:goto)|(?:case)|(?:NULL)|(?:true)|(?:elif)|(?:else)|(?:line)|(?:this)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:for)|(?:try)|(?:asm)|(?:or)|(?:do)|(?:if)|(?:if))\\b)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<29>?)+>)?(?![\\w<:.]))(?:(?:\\s)+)?(\\=)(?:(?:\\s)+)?((?:typename)?)(?:(?:\\s)+)?((?:(?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))(?<!\\w)(?:(?:__constant__)|(?:__restrict__)|(?:__managed__)|(?:__shared__)|(?:volatile)|(?:register)|(?:restrict)|(?:static)|(?:extern)|(?:const))(?!\\w)(?:\\s)+)+)?(?:(\\s*+((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:(?:unsigned)|(?:signed)|(?:short)|(?:long))|(?:(?:struct)|(?:class)|(?:union)|(?:enum)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<29>?)+>)(?:\\s)*+)?::)*+)?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?!(?:(?:transaction_safe_dynamic)|(?:__has_cpp_attribute)|(?:reinterpret_cast)|(?:transaction_safe)|(?:__forceinline__)|(?:atomic_noexcept)|(?:__has_include)|(?:atomic_cancel)|(?:atomic_commit)|(?:dynamic_cast)|(?:__constant__)|(?:__restrict__)|(?:__noinline__)|(?:thread_local)|(?:synchronized)|(?:static_cast)|(?:__managed__)|(?:const_cast)|(?:__shared__)|(?:__global__)|(?:__device__)|(?:co_return)|(?:constexpr)|(?:constexpr)|(?:constexpr)|(?:consteval)|(?:protected)|(?:threadIdx)|(?:namespace)|(?:co_return)|(?:noexcept)|(?:noexcept)|(?:continue)|(?:co_await)|(?:co_yield)|(?:volatile)|(?:register)|(?:restrict)|(?:explicit)|(?:__host__)|(?:override)|(?:volatile)|(?:noexcept)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:template)|(?:operator)|(?:decltype)|(?:typename)|(?:requires)|(?:co_await)|(?:co_yield)|(?:reflexpr)|(?:alignof)|(?:alignas)|(?:default)|(?:nullptr)|(?:mutable)|(?:virtual)|(?:mutable)|(?:private)|(?:include)|(?:warning)|(?:_Pragma)|(?:defined)|(?:gridDim)|(?:typedef)|(?:__asm__)|(?:concept)|(?:sizeof)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:typeid)|(?:switch)|(?:return)|(?:static)|(?:extern)|(?:inline)|(?:friend)|(?:public)|(?:ifndef)|(?:define)|(?:pragma)|(?:export)|(?:import)|(?:module)|(?:compl)|(?:bitor)|(?:throw)|(?:or_eq)|(?:while)|(?:catch)|(?:break)|(?:false)|(?:const)|(?:final)|(?:const)|(?:endif)|(?:ifdef)|(?:undef)|(?:error)|(?:using)|(?:audit)|(?:axiom)|(?:else)|(?:goto)|(?:case)|(?:NULL)|(?:true)|(?:elif)|(?:else)|(?:line)|(?:this)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:for)|(?:try)|(?:asm)|(?:or)|(?:do)|(?:if)|(?:if))\\b)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<29>?)+>)?(?![\\w<:.]))|(.*(?<!;)))(?:(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?:(\\[)(\\w*)(\\])(?:(?:\\s)+)?)?(?:(?:\\s)+)?(?:(;)|\\n)`,
      captures: {
        1: {
          name: "keyword.other.using.directive.cuda-cpp"
        },
        2: {
          name: "meta.qualified_type.cuda-cpp",
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:(?:struct)|(?:class)|(?:union)|(?:enum))(?!\\w)",
            name: "storage.type.$0.cuda-cpp"
          }, {
            include: "#attributes_context"
          }, {
            include: "#storage_types"
          }, {
            include: "#number_literal"
          }, {
            include: "#string_context"
          }, {
            include: "#comma"
          }, {
            include: "#scope_resolution_inner_generated"
          }, {
            begin: "<",
            end: ">",
            beginCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
              }
            },
            name: "meta.template.call.cuda-cpp",
            patterns: [{
              include: "#template_call_context"
            }]
          }, {
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.type.cuda-cpp"
          }]
        },
        3: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        4: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        5: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        6: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        7: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        8: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.type.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.type.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        9: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        11: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        12: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        14: {
          name: "keyword.operator.assignment.cuda-cpp"
        },
        15: {
          name: "keyword.other.typename.cuda-cpp"
        },
        16: {
          patterns: [{
            include: "#storage_specifiers"
          }]
        },
        17: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        18: {
          name: "meta.qualified_type.cuda-cpp",
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:(?:struct)|(?:class)|(?:union)|(?:enum))(?!\\w)",
            name: "storage.type.$0.cuda-cpp"
          }, {
            include: "#attributes_context"
          }, {
            include: "#storage_types"
          }, {
            include: "#number_literal"
          }, {
            include: "#string_context"
          }, {
            include: "#comma"
          }, {
            include: "#scope_resolution_inner_generated"
          }, {
            begin: "<",
            end: ">",
            beginCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
              }
            },
            name: "meta.template.call.cuda-cpp",
            patterns: [{
              include: "#template_call_context"
            }]
          }, {
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.type.cuda-cpp"
          }]
        },
        19: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        20: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        21: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        22: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        23: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        24: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.type.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.type.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        25: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        27: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        28: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        30: {
          name: "meta.declaration.type.alias.value.unknown.cuda-cpp",
          patterns: [{
            include: "#evaluation_context"
          }]
        },
        31: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        32: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        33: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        34: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        35: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        36: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        37: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        38: {
          name: "punctuation.definition.begin.bracket.square.cuda-cpp"
        },
        39: {
          patterns: [{
            include: "#evaluation_context"
          }]
        },
        40: {
          name: "punctuation.definition.end.bracket.square.cuda-cpp"
        },
        41: {
          name: "punctuation.terminator.statement.cuda-cpp"
        }
      },
      name: "meta.declaration.type.alias.cuda-cpp"
    },
    type_casting_operators: {
      match: "((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:(?:reinterpret_cast)|(?:dynamic_cast)|(?:static_cast)|(?:const_cast))(?!\\w))",
      captures: {
        1: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        2: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        3: {
          name: "keyword.operator.wordlike.cuda-cpp keyword.operator.cast.$3.cuda-cpp"
        }
      }
    },
    typedef_class: {
      begin: "((?<!\\w)typedef(?!\\w))(?:(?:\\s)+)?(?=(?<!\\w)class(?!\\w))",
      end: "(?<=;)",
      beginCaptures: {
        1: {
          name: "keyword.other.typedef.cuda-cpp"
        }
      },
      endCaptures: {},
      patterns: [{
        begin: "((?<!\\w)class(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?={)|(?:((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*+)?(?:((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(:(?!:)))?)",
        end: "(?:(?:(?<=\\}|%>|\\?\\?>)(?:(?:\\s)+)?(;)|(;))|(?=[;>\\[\\]=]))",
        beginCaptures: {
          0: {
            name: "meta.head.class.cuda-cpp"
          },
          1: {
            name: "storage.type.$1.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          4: {
            name: "comment.block.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          6: {
            patterns: [{
              include: "#attributes_context"
            }, {
              include: "#number_literal"
            }]
          },
          7: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          8: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          9: {
            name: "comment.block.cuda-cpp"
          },
          10: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          11: {
            patterns: [{
              match: "((?<!\\w)final(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))",
              captures: {
                1: {
                  name: "storage.type.modifier.final.cuda-cpp"
                },
                2: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                3: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                4: {
                  name: "comment.block.cuda-cpp"
                },
                5: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }, {
              match: "((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:((?<!\\w)final(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=:|{|$)",
              captures: {
                1: {
                  name: "entity.name.type.class.cuda-cpp"
                },
                2: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                3: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                4: {
                  name: "comment.block.cuda-cpp"
                },
                5: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                },
                6: {
                  name: "storage.type.modifier.final.cuda-cpp"
                },
                7: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                8: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                9: {
                  name: "comment.block.cuda-cpp"
                },
                10: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }, {
              match: "DLLEXPORT",
              name: "entity.name.other.preprocessor.macro.predefined.DLLEXPORT.cuda-cpp"
            }, {
              match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
              name: "entity.name.other.preprocessor.macro.predefined.probably.$0.cuda-cpp"
            }]
          },
          12: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          13: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          14: {
            name: "comment.block.cuda-cpp"
          },
          15: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          16: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          17: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          18: {
            name: "comment.block.cuda-cpp"
          },
          19: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          20: {
            name: "punctuation.separator.colon.inheritance.cuda-cpp"
          }
        },
        endCaptures: {
          1: {
            name: "punctuation.terminator.statement.cuda-cpp"
          },
          2: {
            name: "punctuation.terminator.statement.cuda-cpp"
          }
        },
        name: "meta.block.class.cuda-cpp",
        patterns: [{
          begin: "\\G ?",
          end: "(?:\\{|<%|\\?\\?<|(?=;))",
          beginCaptures: {},
          endCaptures: {
            0: {
              name: "punctuation.section.block.begin.bracket.curly.class.cuda-cpp"
            }
          },
          name: "meta.head.class.cuda-cpp",
          patterns: [{
            include: "#ever_present_context"
          }, {
            include: "#inheritance_context"
          }, {
            include: "#template_call_range"
          }]
        }, {
          begin: "(?<=\\{|<%|\\?\\?<)",
          end: "\\}|%>|\\?\\?>",
          beginCaptures: {},
          endCaptures: {
            0: {
              name: "punctuation.section.block.end.bracket.curly.class.cuda-cpp"
            }
          },
          name: "meta.body.class.cuda-cpp",
          patterns: [{
            include: "#function_pointer"
          }, {
            include: "#static_assert"
          }, {
            include: "#constructor_inline"
          }, {
            include: "#destructor_inline"
          }, {
            include: "$self"
          }]
        }, {
          begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
          end: "[\\s]*(?=;)",
          beginCaptures: {},
          endCaptures: {},
          name: "meta.tail.class.cuda-cpp",
          patterns: [{
            match: "(((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))",
            captures: {
              1: {
                patterns: [{
                  match: "\\*",
                  name: "storage.modifier.pointer.cuda-cpp"
                }, {
                  match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
                  captures: {
                    1: {
                      patterns: [{
                        include: "#inline_comment"
                      }]
                    },
                    2: {
                      name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                    },
                    3: {
                      name: "comment.block.cuda-cpp"
                    },
                    4: {
                      patterns: [{
                        match: "\\*\\/",
                        name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                      }, {
                        match: "\\*",
                        name: "comment.block.cuda-cpp"
                      }]
                    }
                  },
                  name: "invalid.illegal.reference-type.cuda-cpp"
                }, {
                  match: "\\&",
                  name: "storage.modifier.reference.cuda-cpp"
                }]
              },
              2: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              3: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              4: {
                name: "comment.block.cuda-cpp"
              },
              5: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              6: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              7: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              8: {
                name: "comment.block.cuda-cpp"
              },
              9: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              10: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              11: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              12: {
                name: "comment.block.cuda-cpp"
              },
              13: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              14: {
                name: "entity.name.type.alias.cuda-cpp"
              }
            }
          }, {
            match: ","
          }]
        }]
      }]
    },
    typedef_function_pointer: {
      begin: "((?<!\\w)typedef(?!\\w))(?:(?:\\s)+)?(?=.*\\(\\*\\s*(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\s*\\))",
      end: "(?<=;)",
      beginCaptures: {
        1: {
          name: "keyword.other.typedef.cuda-cpp"
        }
      },
      endCaptures: {},
      patterns: [{
        begin: `(\\s*+((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:(?:unsigned)|(?:signed)|(?:short)|(?:long))|(?:(?:struct)|(?:class)|(?:union)|(?:enum)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<18>?)+>)(?:\\s)*+)?::)*+)?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?!(?:(?:transaction_safe_dynamic)|(?:__has_cpp_attribute)|(?:reinterpret_cast)|(?:transaction_safe)|(?:__forceinline__)|(?:atomic_noexcept)|(?:__has_include)|(?:atomic_cancel)|(?:atomic_commit)|(?:dynamic_cast)|(?:__constant__)|(?:__restrict__)|(?:__noinline__)|(?:thread_local)|(?:synchronized)|(?:static_cast)|(?:__managed__)|(?:const_cast)|(?:__shared__)|(?:__global__)|(?:__device__)|(?:co_return)|(?:constexpr)|(?:constexpr)|(?:constexpr)|(?:consteval)|(?:protected)|(?:threadIdx)|(?:namespace)|(?:co_return)|(?:noexcept)|(?:noexcept)|(?:continue)|(?:co_await)|(?:co_yield)|(?:volatile)|(?:register)|(?:restrict)|(?:explicit)|(?:__host__)|(?:override)|(?:volatile)|(?:noexcept)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:template)|(?:operator)|(?:decltype)|(?:typename)|(?:requires)|(?:co_await)|(?:co_yield)|(?:reflexpr)|(?:alignof)|(?:alignas)|(?:default)|(?:nullptr)|(?:mutable)|(?:virtual)|(?:mutable)|(?:private)|(?:include)|(?:warning)|(?:_Pragma)|(?:defined)|(?:gridDim)|(?:typedef)|(?:__asm__)|(?:concept)|(?:sizeof)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:typeid)|(?:switch)|(?:return)|(?:static)|(?:extern)|(?:inline)|(?:friend)|(?:public)|(?:ifndef)|(?:define)|(?:pragma)|(?:export)|(?:import)|(?:module)|(?:compl)|(?:bitor)|(?:throw)|(?:or_eq)|(?:while)|(?:catch)|(?:break)|(?:false)|(?:const)|(?:final)|(?:const)|(?:endif)|(?:ifdef)|(?:undef)|(?:error)|(?:using)|(?:audit)|(?:axiom)|(?:else)|(?:goto)|(?:case)|(?:NULL)|(?:true)|(?:elif)|(?:else)|(?:line)|(?:this)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:for)|(?:try)|(?:asm)|(?:or)|(?:do)|(?:if)|(?:if))\\b)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<18>?)+>)?(?![\\w<:.]))(((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()(\\*)(?:(?:\\s)+)?((?:(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*)?)(?:(?:\\s)+)?(?:(\\[)(\\w*)(\\])(?:(?:\\s)+)?)*(\\))(?:(?:\\s)+)?(\\()`,
        end: "(\\))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=[{=,);>]|\\n)(?!\\()",
        beginCaptures: {
          1: {
            name: "meta.qualified_type.cuda-cpp",
            patterns: [{
              match: "::",
              name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
            }, {
              match: "(?<!\\w)(?:(?:struct)|(?:class)|(?:union)|(?:enum))(?!\\w)",
              name: "storage.type.$0.cuda-cpp"
            }, {
              include: "#attributes_context"
            }, {
              include: "#storage_types"
            }, {
              include: "#number_literal"
            }, {
              include: "#string_context"
            }, {
              include: "#comma"
            }, {
              include: "#scope_resolution_inner_generated"
            }, {
              begin: "<",
              end: ">",
              beginCaptures: {
                0: {
                  name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
                }
              },
              endCaptures: {
                0: {
                  name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
                }
              },
              name: "meta.template.call.cuda-cpp",
              patterns: [{
                include: "#template_call_context"
              }]
            }, {
              match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
              name: "entity.name.type.cuda-cpp"
            }]
          },
          2: {
            patterns: [{
              include: "#attributes_context"
            }, {
              include: "#number_literal"
            }]
          },
          3: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          4: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          5: {
            name: "comment.block.cuda-cpp"
          },
          6: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          7: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          8: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          9: {
            name: "comment.block.cuda-cpp"
          },
          10: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          11: {
            patterns: [{
              match: "::",
              name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.type.cuda-cpp"
            }, {
              match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
              name: "entity.name.scope-resolution.type.cuda-cpp"
            }, {
              include: "#template_call_range"
            }]
          },
          12: {
            patterns: [{
              include: "#template_call_range"
            }]
          },
          13: {},
          14: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          15: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          16: {
            name: "comment.block.cuda-cpp"
          },
          17: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          18: {},
          19: {
            patterns: [{
              match: "\\*",
              name: "storage.modifier.pointer.cuda-cpp"
            }, {
              match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
              captures: {
                1: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                2: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                3: {
                  name: "comment.block.cuda-cpp"
                },
                4: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              },
              name: "invalid.illegal.reference-type.cuda-cpp"
            }, {
              match: "\\&",
              name: "storage.modifier.reference.cuda-cpp"
            }]
          },
          20: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          21: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          22: {
            name: "comment.block.cuda-cpp"
          },
          23: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          24: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          25: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          26: {
            name: "comment.block.cuda-cpp"
          },
          27: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          28: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          29: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          30: {
            name: "comment.block.cuda-cpp"
          },
          31: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          32: {
            name: "punctuation.section.parens.begin.bracket.round.function.pointer.cuda-cpp"
          },
          33: {
            name: "punctuation.definition.function.pointer.dereference.cuda-cpp"
          },
          34: {
            name: "entity.name.type.alias.cuda-cpp entity.name.type.pointer.function.cuda-cpp"
          },
          35: {
            name: "punctuation.definition.begin.bracket.square.cuda-cpp"
          },
          36: {
            patterns: [{
              include: "#evaluation_context"
            }]
          },
          37: {
            name: "punctuation.definition.end.bracket.square.cuda-cpp"
          },
          38: {
            name: "punctuation.section.parens.end.bracket.round.function.pointer.cuda-cpp"
          },
          39: {
            name: "punctuation.section.parameters.begin.bracket.round.function.pointer.cuda-cpp"
          }
        },
        endCaptures: {
          1: {
            name: "punctuation.section.parameters.end.bracket.round.function.pointer.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          4: {
            name: "comment.block.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          }
        },
        patterns: [{
          include: "#function_parameter_context"
        }]
      }]
    },
    typedef_struct: {
      begin: "((?<!\\w)typedef(?!\\w))(?:(?:\\s)+)?(?=(?<!\\w)struct(?!\\w))",
      end: "(?<=;)",
      beginCaptures: {
        1: {
          name: "keyword.other.typedef.cuda-cpp"
        }
      },
      endCaptures: {},
      patterns: [{
        begin: "((?<!\\w)struct(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?={)|(?:((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*+)?(?:((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(:(?!:)))?)",
        end: "(?:(?:(?<=\\}|%>|\\?\\?>)(?:(?:\\s)+)?(;)|(;))|(?=[;>\\[\\]=]))",
        beginCaptures: {
          0: {
            name: "meta.head.struct.cuda-cpp"
          },
          1: {
            name: "storage.type.$1.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          4: {
            name: "comment.block.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          6: {
            patterns: [{
              include: "#attributes_context"
            }, {
              include: "#number_literal"
            }]
          },
          7: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          8: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          9: {
            name: "comment.block.cuda-cpp"
          },
          10: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          11: {
            patterns: [{
              match: "((?<!\\w)final(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))",
              captures: {
                1: {
                  name: "storage.type.modifier.final.cuda-cpp"
                },
                2: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                3: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                4: {
                  name: "comment.block.cuda-cpp"
                },
                5: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }, {
              match: "((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:((?<!\\w)final(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=:|{|$)",
              captures: {
                1: {
                  name: "entity.name.type.struct.cuda-cpp"
                },
                2: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                3: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                4: {
                  name: "comment.block.cuda-cpp"
                },
                5: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                },
                6: {
                  name: "storage.type.modifier.final.cuda-cpp"
                },
                7: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                8: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                9: {
                  name: "comment.block.cuda-cpp"
                },
                10: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }, {
              match: "DLLEXPORT",
              name: "entity.name.other.preprocessor.macro.predefined.DLLEXPORT.cuda-cpp"
            }, {
              match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
              name: "entity.name.other.preprocessor.macro.predefined.probably.$0.cuda-cpp"
            }]
          },
          12: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          13: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          14: {
            name: "comment.block.cuda-cpp"
          },
          15: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          16: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          17: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          18: {
            name: "comment.block.cuda-cpp"
          },
          19: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          20: {
            name: "punctuation.separator.colon.inheritance.cuda-cpp"
          }
        },
        endCaptures: {
          1: {
            name: "punctuation.terminator.statement.cuda-cpp"
          },
          2: {
            name: "punctuation.terminator.statement.cuda-cpp"
          }
        },
        name: "meta.block.struct.cuda-cpp",
        patterns: [{
          begin: "\\G ?",
          end: "(?:\\{|<%|\\?\\?<|(?=;))",
          beginCaptures: {},
          endCaptures: {
            0: {
              name: "punctuation.section.block.begin.bracket.curly.struct.cuda-cpp"
            }
          },
          name: "meta.head.struct.cuda-cpp",
          patterns: [{
            include: "#ever_present_context"
          }, {
            include: "#inheritance_context"
          }, {
            include: "#template_call_range"
          }]
        }, {
          begin: "(?<=\\{|<%|\\?\\?<)",
          end: "\\}|%>|\\?\\?>",
          beginCaptures: {},
          endCaptures: {
            0: {
              name: "punctuation.section.block.end.bracket.curly.struct.cuda-cpp"
            }
          },
          name: "meta.body.struct.cuda-cpp",
          patterns: [{
            include: "#function_pointer"
          }, {
            include: "#static_assert"
          }, {
            include: "#constructor_inline"
          }, {
            include: "#destructor_inline"
          }, {
            include: "$self"
          }]
        }, {
          begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
          end: "[\\s]*(?=;)",
          beginCaptures: {},
          endCaptures: {},
          name: "meta.tail.struct.cuda-cpp",
          patterns: [{
            match: "(((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))",
            captures: {
              1: {
                patterns: [{
                  match: "\\*",
                  name: "storage.modifier.pointer.cuda-cpp"
                }, {
                  match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
                  captures: {
                    1: {
                      patterns: [{
                        include: "#inline_comment"
                      }]
                    },
                    2: {
                      name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                    },
                    3: {
                      name: "comment.block.cuda-cpp"
                    },
                    4: {
                      patterns: [{
                        match: "\\*\\/",
                        name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                      }, {
                        match: "\\*",
                        name: "comment.block.cuda-cpp"
                      }]
                    }
                  },
                  name: "invalid.illegal.reference-type.cuda-cpp"
                }, {
                  match: "\\&",
                  name: "storage.modifier.reference.cuda-cpp"
                }]
              },
              2: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              3: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              4: {
                name: "comment.block.cuda-cpp"
              },
              5: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              6: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              7: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              8: {
                name: "comment.block.cuda-cpp"
              },
              9: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              10: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              11: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              12: {
                name: "comment.block.cuda-cpp"
              },
              13: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              14: {
                name: "entity.name.type.alias.cuda-cpp"
              }
            }
          }, {
            match: ","
          }]
        }]
      }]
    },
    typedef_union: {
      begin: "((?<!\\w)typedef(?!\\w))(?:(?:\\s)+)?(?=(?<!\\w)union(?!\\w))",
      end: "(?<=;)",
      beginCaptures: {
        1: {
          name: "keyword.other.typedef.cuda-cpp"
        }
      },
      endCaptures: {},
      patterns: [{
        begin: "((?<!\\w)union(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?={)|(?:((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*+)?(?:((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(:(?!:)))?)",
        end: "(?:(?:(?<=\\}|%>|\\?\\?>)(?:(?:\\s)+)?(;)|(;))|(?=[;>\\[\\]=]))",
        beginCaptures: {
          0: {
            name: "meta.head.union.cuda-cpp"
          },
          1: {
            name: "storage.type.$1.cuda-cpp"
          },
          2: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          3: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          4: {
            name: "comment.block.cuda-cpp"
          },
          5: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          6: {
            patterns: [{
              include: "#attributes_context"
            }, {
              include: "#number_literal"
            }]
          },
          7: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          8: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          9: {
            name: "comment.block.cuda-cpp"
          },
          10: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          11: {
            patterns: [{
              match: "((?<!\\w)final(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))",
              captures: {
                1: {
                  name: "storage.type.modifier.final.cuda-cpp"
                },
                2: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                3: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                4: {
                  name: "comment.block.cuda-cpp"
                },
                5: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }, {
              match: "((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:((?<!\\w)final(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=:|{|$)",
              captures: {
                1: {
                  name: "entity.name.type.union.cuda-cpp"
                },
                2: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                3: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                4: {
                  name: "comment.block.cuda-cpp"
                },
                5: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                },
                6: {
                  name: "storage.type.modifier.final.cuda-cpp"
                },
                7: {
                  patterns: [{
                    include: "#inline_comment"
                  }]
                },
                8: {
                  name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                },
                9: {
                  name: "comment.block.cuda-cpp"
                },
                10: {
                  patterns: [{
                    match: "\\*\\/",
                    name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                  }, {
                    match: "\\*",
                    name: "comment.block.cuda-cpp"
                  }]
                }
              }
            }, {
              match: "DLLEXPORT",
              name: "entity.name.other.preprocessor.macro.predefined.DLLEXPORT.cuda-cpp"
            }, {
              match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
              name: "entity.name.other.preprocessor.macro.predefined.probably.$0.cuda-cpp"
            }]
          },
          12: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          13: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          14: {
            name: "comment.block.cuda-cpp"
          },
          15: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          16: {
            patterns: [{
              include: "#inline_comment"
            }]
          },
          17: {
            name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
          },
          18: {
            name: "comment.block.cuda-cpp"
          },
          19: {
            patterns: [{
              match: "\\*\\/",
              name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
            }, {
              match: "\\*",
              name: "comment.block.cuda-cpp"
            }]
          },
          20: {
            name: "punctuation.separator.colon.inheritance.cuda-cpp"
          }
        },
        endCaptures: {
          1: {
            name: "punctuation.terminator.statement.cuda-cpp"
          },
          2: {
            name: "punctuation.terminator.statement.cuda-cpp"
          }
        },
        name: "meta.block.union.cuda-cpp",
        patterns: [{
          begin: "\\G ?",
          end: "(?:\\{|<%|\\?\\?<|(?=;))",
          beginCaptures: {},
          endCaptures: {
            0: {
              name: "punctuation.section.block.begin.bracket.curly.union.cuda-cpp"
            }
          },
          name: "meta.head.union.cuda-cpp",
          patterns: [{
            include: "#ever_present_context"
          }, {
            include: "#inheritance_context"
          }, {
            include: "#template_call_range"
          }]
        }, {
          begin: "(?<=\\{|<%|\\?\\?<)",
          end: "\\}|%>|\\?\\?>",
          beginCaptures: {},
          endCaptures: {
            0: {
              name: "punctuation.section.block.end.bracket.curly.union.cuda-cpp"
            }
          },
          name: "meta.body.union.cuda-cpp",
          patterns: [{
            include: "#function_pointer"
          }, {
            include: "#static_assert"
          }, {
            include: "#constructor_inline"
          }, {
            include: "#destructor_inline"
          }, {
            include: "$self"
          }]
        }, {
          begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
          end: "[\\s]*(?=;)",
          beginCaptures: {},
          endCaptures: {},
          name: "meta.tail.union.cuda-cpp",
          patterns: [{
            match: "(((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))",
            captures: {
              1: {
                patterns: [{
                  match: "\\*",
                  name: "storage.modifier.pointer.cuda-cpp"
                }, {
                  match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
                  captures: {
                    1: {
                      patterns: [{
                        include: "#inline_comment"
                      }]
                    },
                    2: {
                      name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
                    },
                    3: {
                      name: "comment.block.cuda-cpp"
                    },
                    4: {
                      patterns: [{
                        match: "\\*\\/",
                        name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                      }, {
                        match: "\\*",
                        name: "comment.block.cuda-cpp"
                      }]
                    }
                  },
                  name: "invalid.illegal.reference-type.cuda-cpp"
                }, {
                  match: "\\&",
                  name: "storage.modifier.reference.cuda-cpp"
                }]
              },
              2: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              3: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              4: {
                name: "comment.block.cuda-cpp"
              },
              5: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              6: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              7: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              8: {
                name: "comment.block.cuda-cpp"
              },
              9: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              10: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              11: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              12: {
                name: "comment.block.cuda-cpp"
              },
              13: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              14: {
                name: "entity.name.type.alias.cuda-cpp"
              }
            }
          }, {
            match: ","
          }]
        }]
      }]
    },
    typeid_operator: {
      begin: "((?<!\\w)typeid(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\()",
      end: "\\)",
      beginCaptures: {
        1: {
          name: "keyword.operator.functionlike.cuda-cpp keyword.operator.typeid.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        6: {
          name: "punctuation.section.arguments.begin.bracket.round.operator.typeid.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.section.arguments.end.bracket.round.operator.typeid.cuda-cpp"
        }
      },
      contentName: "meta.arguments.operator.typeid",
      patterns: [{
        include: "#evaluation_context"
      }]
    },
    typename: {
      match: `(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?<!\\w)typename(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(\\s*+((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?:(?:(?:unsigned)|(?:signed)|(?:short)|(?:long))|(?:(?:struct)|(?:class)|(?:union)|(?:enum)))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*((?:::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<17>?)+>)(?:\\s)*+)?::)*+)?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?!(?:(?:transaction_safe_dynamic)|(?:__has_cpp_attribute)|(?:reinterpret_cast)|(?:transaction_safe)|(?:__forceinline__)|(?:atomic_noexcept)|(?:__has_include)|(?:atomic_cancel)|(?:atomic_commit)|(?:dynamic_cast)|(?:__constant__)|(?:__restrict__)|(?:__noinline__)|(?:thread_local)|(?:synchronized)|(?:static_cast)|(?:__managed__)|(?:const_cast)|(?:__shared__)|(?:__global__)|(?:__device__)|(?:co_return)|(?:constexpr)|(?:constexpr)|(?:constexpr)|(?:consteval)|(?:protected)|(?:threadIdx)|(?:namespace)|(?:co_return)|(?:noexcept)|(?:noexcept)|(?:continue)|(?:co_await)|(?:co_yield)|(?:volatile)|(?:register)|(?:restrict)|(?:explicit)|(?:__host__)|(?:override)|(?:volatile)|(?:noexcept)|(?:blockIdx)|(?:blockDim)|(?:warpSize)|(?:template)|(?:operator)|(?:decltype)|(?:typename)|(?:requires)|(?:co_await)|(?:co_yield)|(?:reflexpr)|(?:alignof)|(?:alignas)|(?:default)|(?:nullptr)|(?:mutable)|(?:virtual)|(?:mutable)|(?:private)|(?:include)|(?:warning)|(?:_Pragma)|(?:defined)|(?:gridDim)|(?:typedef)|(?:__asm__)|(?:concept)|(?:sizeof)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:typeid)|(?:switch)|(?:return)|(?:static)|(?:extern)|(?:inline)|(?:friend)|(?:public)|(?:ifndef)|(?:define)|(?:pragma)|(?:export)|(?:import)|(?:module)|(?:compl)|(?:bitor)|(?:throw)|(?:or_eq)|(?:while)|(?:catch)|(?:break)|(?:false)|(?:const)|(?:final)|(?:const)|(?:endif)|(?:ifdef)|(?:undef)|(?:error)|(?:using)|(?:audit)|(?:axiom)|(?:else)|(?:goto)|(?:case)|(?:NULL)|(?:true)|(?:elif)|(?:else)|(?:line)|(?:this)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:for)|(?:try)|(?:asm)|(?:or)|(?:do)|(?:if)|(?:if))\\b)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*\\b((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<17>?)+>)?(?![\\w<:.]))`,
      captures: {
        1: {
          name: "storage.modifier.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        4: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        5: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        6: {
          name: "meta.qualified_type.cuda-cpp",
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:(?:struct)|(?:class)|(?:union)|(?:enum))(?!\\w)",
            name: "storage.type.$0.cuda-cpp"
          }, {
            include: "#attributes_context"
          }, {
            include: "#storage_types"
          }, {
            include: "#number_literal"
          }, {
            include: "#string_context"
          }, {
            include: "#comma"
          }, {
            include: "#scope_resolution_inner_generated"
          }, {
            begin: "<",
            end: ">",
            beginCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.begin.template.call.cuda-cpp"
              }
            },
            endCaptures: {
              0: {
                name: "punctuation.section.angle-brackets.end.template.call.cuda-cpp"
              }
            },
            name: "meta.template.call.cuda-cpp",
            patterns: [{
              include: "#template_call_context"
            }]
          }, {
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.type.cuda-cpp"
          }]
        },
        7: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        8: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        9: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        10: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        11: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        12: {
          patterns: [{
            match: "::",
            name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.type.cuda-cpp"
          }, {
            match: "(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)",
            name: "entity.name.scope-resolution.type.cuda-cpp"
          }, {
            include: "#template_call_range"
          }]
        },
        13: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        14: {},
        15: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        16: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        17: {}
      }
    },
    undef: {
      match: "(^((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(#)(?:(?:\\s)+)?undef\\b)((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))",
      captures: {
        1: {
          name: "keyword.control.directive.undef.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        4: {
          name: "punctuation.definition.directive.cuda-cpp"
        },
        5: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        6: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        7: {
          name: "entity.name.function.preprocessor.cuda-cpp"
        }
      },
      name: "meta.preprocessor.undef.cuda-cpp"
    },
    union_block: {
      begin: "((?<!\\w)union(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:(?={)|(?:((?:(?:(?:\\[\\[.*?\\]\\]|__attribute(?:__)?\\s*\\(\\s*\\(.*?\\)\\s*\\))|__declspec\\(.*?\\))|alignas\\(.*?\\))(?!\\)))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?((?:(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*+)?(?:((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(:(?!:)))?)",
      end: "(?:(?:(?<=\\}|%>|\\?\\?>)(?:(?:\\s)+)?(;)|(;))|(?=[;>\\[\\]=]))",
      beginCaptures: {
        0: {
          name: "meta.head.union.cuda-cpp"
        },
        1: {
          name: "storage.type.$1.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        4: {
          name: "comment.block.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        6: {
          patterns: [{
            include: "#attributes_context"
          }, {
            include: "#number_literal"
          }]
        },
        7: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        8: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        9: {
          name: "comment.block.cuda-cpp"
        },
        10: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        11: {
          patterns: [{
            match: "((?<!\\w)final(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))",
            captures: {
              1: {
                name: "storage.type.modifier.final.cuda-cpp"
              },
              2: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              3: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              4: {
                name: "comment.block.cuda-cpp"
              },
              5: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }, {
            match: "((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?:((?<!\\w)final(?!\\w))((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))?(?=:|{|$)",
            captures: {
              1: {
                name: "entity.name.type.union.cuda-cpp"
              },
              2: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              3: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              4: {
                name: "comment.block.cuda-cpp"
              },
              5: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              },
              6: {
                name: "storage.type.modifier.final.cuda-cpp"
              },
              7: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              8: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              9: {
                name: "comment.block.cuda-cpp"
              },
              10: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }, {
            match: "DLLEXPORT",
            name: "entity.name.other.preprocessor.macro.predefined.DLLEXPORT.cuda-cpp"
          }, {
            match: "(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*",
            name: "entity.name.other.preprocessor.macro.predefined.probably.$0.cuda-cpp"
          }]
        },
        12: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        13: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        14: {
          name: "comment.block.cuda-cpp"
        },
        15: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        16: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        17: {
          name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
        },
        18: {
          name: "comment.block.cuda-cpp"
        },
        19: {
          patterns: [{
            match: "\\*\\/",
            name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
          }, {
            match: "\\*",
            name: "comment.block.cuda-cpp"
          }]
        },
        20: {
          name: "punctuation.separator.colon.inheritance.cuda-cpp"
        }
      },
      endCaptures: {
        1: {
          name: "punctuation.terminator.statement.cuda-cpp"
        },
        2: {
          name: "punctuation.terminator.statement.cuda-cpp"
        }
      },
      name: "meta.block.union.cuda-cpp",
      patterns: [{
        begin: "\\G ?",
        end: "(?:\\{|<%|\\?\\?<|(?=;))",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.begin.bracket.curly.union.cuda-cpp"
          }
        },
        name: "meta.head.union.cuda-cpp",
        patterns: [{
          include: "#ever_present_context"
        }, {
          include: "#inheritance_context"
        }, {
          include: "#template_call_range"
        }]
      }, {
        begin: "(?<=\\{|<%|\\?\\?<)",
        end: "\\}|%>|\\?\\?>",
        beginCaptures: {},
        endCaptures: {
          0: {
            name: "punctuation.section.block.end.bracket.curly.union.cuda-cpp"
          }
        },
        name: "meta.body.union.cuda-cpp",
        patterns: [{
          include: "#function_pointer"
        }, {
          include: "#static_assert"
        }, {
          include: "#constructor_inline"
        }, {
          include: "#destructor_inline"
        }, {
          include: "$self"
        }]
      }, {
        begin: "(?<=\\}|%>|\\?\\?>)[\\s]*",
        end: "[\\s]*(?=;)",
        beginCaptures: {},
        endCaptures: {},
        name: "meta.tail.union.cuda-cpp",
        patterns: [{
          include: "$self"
        }]
      }]
    },
    union_declare: {
      match: "((?<!\\w)union(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))?(?:(?:&|(?:\\*))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z))))*(?:&|(?:\\*)))?((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))\\b(?!override\\W|override\\$|final\\W|final\\$)((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))((?:((?:(?>(?:\\s)+)|\\/\\*(?:[^\\*]|(?:\\*)++[^\\/])*+(?:\\*)++\\/)+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))(?=\\S)(?![:{a-zA-Z])",
      captures: {
        1: {
          name: "storage.type.union.declare.cuda-cpp"
        },
        2: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        3: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        4: {
          name: "entity.name.type.union.cuda-cpp"
        },
        5: {
          patterns: [{
            match: "\\*",
            name: "storage.modifier.pointer.cuda-cpp"
          }, {
            match: "(?:\\&((?:(?:(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))+)|(?:\\b)|(?=\\W)|(?<=\\W)|(?:\\A)|(?:\\Z)))){2,}\\&",
            captures: {
              1: {
                patterns: [{
                  include: "#inline_comment"
                }]
              },
              2: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              3: {
                name: "comment.block.cuda-cpp"
              },
              4: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            },
            name: "invalid.illegal.reference-type.cuda-cpp"
          }, {
            match: "\\&",
            name: "storage.modifier.reference.cuda-cpp"
          }]
        },
        6: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        7: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        8: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        9: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        10: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        11: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        },
        12: {
          name: "variable.other.object.declare.cuda-cpp"
        },
        13: {
          patterns: [{
            include: "#inline_comment"
          }]
        },
        14: {
          patterns: [{
            match: "(?:(?>(?:\\s)+)|(\\/\\*)((?:[^\\*]|(?:\\*)++[^\\/])*+((?:\\*)++\\/)))",
            captures: {
              1: {
                name: "comment.block.cuda-cpp punctuation.definition.comment.begin.cuda-cpp"
              },
              2: {
                name: "comment.block.cuda-cpp"
              },
              3: {
                patterns: [{
                  match: "\\*\\/",
                  name: "comment.block.cuda-cpp punctuation.definition.comment.end.cuda-cpp"
                }, {
                  match: "\\*",
                  name: "comment.block.cuda-cpp"
                }]
              }
            }
          }]
        }
      }
    },
    using_name: {
      match: "(using)(?:\\s)+(?!namespace\\b)",
      captures: {
        1: {
          name: "keyword.other.using.directive.cuda-cpp"
        }
      }
    },
    using_namespace: {
      begin: `(?<!\\w)(using)(?:\\s)+(namespace)(?:\\s)+((::)?(?:(?!\\b(?:__has_cpp_attribute|reinterpret_cast|__forceinline__|atomic_noexcept|__has_include|atomic_cancel|atomic_commit|dynamic_cast|__constant__|__restrict__|__noinline__|thread_local|synchronized|static_cast|__managed__|const_cast|__shared__|__global__|__device__|co_return|constexpr|constexpr|constexpr|consteval|protected|namespace|co_return|noexcept|noexcept|continue|co_await|co_yield|volatile|register|restrict|explicit|__host__|volatile|noexcept|template|operator|decltype|typename|requires|co_await|co_yield|reflexpr|alignof|alignas|default|mutable|virtual|mutable|private|include|warning|_Pragma|defined|typedef|__asm__|concept|sizeof|delete|not_eq|bitand|and_eq|xor_eq|typeid|switch|return|struct|static|extern|inline|friend|public|ifndef|define|pragma|export|import|module|compl|bitor|throw|or_eq|while|catch|break|class|union|const|const|endif|ifdef|undef|error|using|else|goto|case|enum|elif|else|line|this|not|new|xor|and|for|try|asm|or|do|if|if)\\b)(?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w)\\s*+(((?<!<)<(?!<)(?:(?:(?:[^'"<>]*+|"(?:[^"]*|\\\\")")|'(?:[^']*|\\\\')')\\g<6>?)+>)(?:\\s)*+)?::)*\\s*+)?((?<!\\w)(?:[a-zA-Z_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))(?:[a-zA-Z0-9_]|(?:\\\\u[0-9a-fA-F]{4}|\\\\U[0-9a-fA-F]{8}))*(?!\\w))(?=;|\\n)`,
      end: ";",
      beginCaptures: {
        1: {
          name: "keyword.other.using.directive.cuda-cpp"
        },
        2: {
          name: "keyword.other.namespace.directive.cuda-cpp storage.type.namespace.directive.cuda-cpp"
        },
        3: {
          patterns: [{
            include: "#scope_resolution_namespace_using_inner_generated"
          }]
        },
        4: {
          name: "punctuation.separator.namespace.access.cuda-cpp punctuation.separator.scope-resolution.namespace.using.cuda-cpp"
        },
        5: {
          patterns: [{
            include: "#template_call_range"
          }]
        },
        6: {},
        7: {
          name: "entity.name.namespace.cuda-cpp"
        }
      },
      endCaptures: {
        0: {
          name: "punctuation.terminator.statement.cuda-cpp"
        }
      },
      name: "meta.using-namespace.cuda-cpp"
    },
    vararg_ellipses: {
      match: "(?<!\\.)\\.\\.\\.(?!\\.)",
      name: "punctuation.vararg-ellipses.cuda-cpp"
    },
    wordlike_operators: {
      patterns: [{
        match: "(?<!\\w)(?:(?:noexcept)|(?:delete)|(?:not_eq)|(?:bitand)|(?:and_eq)|(?:xor_eq)|(?:compl)|(?:bitor)|(?:or_eq)|(?:not)|(?:new)|(?:xor)|(?:and)|(?:or))(?!\\w)",
        name: "keyword.operator.wordlike.cuda-cpp keyword.operator.$0.cuda-cpp"
      }]
    }
  }
};